import * as alt from 'alt-server';
import * as PluginAPI from './api.js';
import { useRebar } from '@Server/index.js';
import { CharacterSelectEvents } from '../shared/events.js';
import { Character } from '@Shared/types/character.js';
import { CollectionNames } from '@Server/document/shared.js';

const Rebar = useRebar();
const api = Rebar.useApi();
const db = Rebar.database.useDatabase();
const sessionKey = 'can-select-character';

const spawnCoords = {
    pos: { x: -1354.4071044921875, y: -1180.5870361328125, z: 4.421841621398926 },
    rot: { x: 0, y: 0, z: 2.6257832050323486 },
    heading: 150,
};

async function getCharacters(player: alt.Player): Promise<Character[] | undefined> {
    if (!player.getMeta(sessionKey)) {
        return undefined;
    }

    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        return undefined;
    }

    return await db.getMany<Character>({ account_id: accDocument.getField('_id') }, CollectionNames.Characters);
}

async function getCharacter(player: alt.Player, id: string): Promise<Character | undefined> {
    alt.log(id);
    if (!player.getMeta(sessionKey)) {
        return undefined;
    }

    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        return undefined;
    }

    return await db.get<Character>({ account_id: accDocument.getField('_id'), _id: id }, CollectionNames.Characters);
}

async function showSelection(player: alt.Player) {
    await alt.Utils.wait(100);
    if (!player.getMeta(sessionKey)) {
        return;
    }
    const playerWorld = Rebar.player.useWorld(player);
    Rebar.player.useNative(player).invoke('displayRadar', false);
    player.emit(CharacterSelectEvents.toClient.toggleControls, false);

    const characters = await getCharacters(player);

    const webview = Rebar.player.useWebview(player);
    webview.show('CharacterSelect', 'page');
    await webview.isReady('CharacterSelect', 'page');

    webview.emit(CharacterSelectEvents.toWebview.setCharacters, characters);
    await alt.Utils.wait(500);
    playerWorld.clearScreenFade(500);
}

async function handleLogin(player: alt.Player) {
    player.model = 'mp_m_freemode_01';
    player.spawn(spawnCoords.pos);
    player.pos = new alt.Vector3(spawnCoords.pos.x, spawnCoords.pos.y, spawnCoords.pos.z);
    player.rot = new alt.Vector3(spawnCoords.rot.x, spawnCoords.rot.y, spawnCoords.rot.z);
    player.frozen = true;
    player.visible = false;
    await alt.Utils.wait(500);
    player.setMeta(sessionKey, true);
    player.dimension = player.id + 1;
    showSelection(player);
}

function openCreator(player: alt.Player) {
    if (!player.getMeta(sessionKey)) {
        return;
    }
    const playerWorld = Rebar.player.useWorld(player);
    playerWorld.setScreenFade(0);
    player.emit(CharacterSelectEvents.toClient.toggleControls, true);
    PluginAPI.invokeCreator(player);
}

async function handleDelete(player: alt.Player, id: string) {
    if (!player.getMeta(sessionKey)) {
        return;
    }

    const webview = Rebar.player.useWebview(player);
    let characters = await getCharacters(player);

    await db.deleteDocument(id, CollectionNames.Characters);

    characters = await getCharacters(player);

    webview.emit(CharacterSelectEvents.toWebview.setCharacters, characters);
}

async function syncAppearance(player: alt.Player, id: string) {
    alt.log(id);
    if (!player.getMeta(sessionKey)) {
        return;
    }
    const character = await getCharacter(player, id);

    if (!character) {
        player.visible = false;
        return;
    }

    const appearance = Rebar.player.usePlayerAppearance(player);
    const clothing = Rebar.player.useClothing(player);
    appearance.apply(character.appearance);
    clothing.apply(character);
    player.visible = true;
}

async function handleSpawnCharacter(player: alt.Player, id: string) {
    const clothing = Rebar.player.useClothing(player);
    const appearance = Rebar.player.usePlayerAppearance(player);
    const webview = Rebar.player.useWebview(player);
    const native = Rebar.player.useNative(player);
    const world = Rebar.player.useWorld(player);
    const state = Rebar.player.useState(player);

    const character = await getCharacter(player, id);

    if (!character) {
        player.kick('');
        return;
    }

    world.setScreenFade(0);

    await alt.Utils.wait(200);

    Rebar.document.character.useCharacterBinder(player).bind(character);

    native.invoke('displayRadar', true);
    webview.hide('CharacterSelect');

    player.dimension = 0;

    appearance.sync();
    clothing.sync();
    state.sync();

    player.frozen = false;
    player.visible = true;
    player.emit(CharacterSelectEvents.toClient.toggleControls, true);
    player.deleteMeta(sessionKey);
    PluginAPI.invokeSelect(player, character);
    world.clearScreenFade(500);
}

async function init() {
    const auth = await api.getAsync('discord-auth-api');
    const creator = await api.getAsync('character-creator-api');
    creator.onExit(showSelection);
    auth.onLogin(handleLogin);
    alt.onClient(CharacterSelectEvents.toServer.openCreator, openCreator);
    alt.onClient(CharacterSelectEvents.toServer.delete, handleDelete);
    alt.onClient(CharacterSelectEvents.toServer.syncAppearance, syncAppearance);
    alt.onClient(CharacterSelectEvents.toServer.handlePlay, handleSpawnCharacter);
}

init();
