import * as alt from 'alt-server';
import * as PluginAPI from './api.js';
import { useRebar } from '@Server/index.js';
import { CharacterSelectEvents } from '../shared/events.js';
import { Character } from '@Shared/types/character.js';
import { CollectionNames } from '@Server/document/shared.js';

const Rebar = useRebar();
const api = Rebar.useApi();
const db = Rebar.database.useDatabase();

const spawnCoords = {
    pos: { x: -1354.4071044921875, y: -1180.5870361328125, z: 4.421841621398926 },
    rot: { x: 0, y: 0, z: 2.6257832050323486 },
    heading: 150,
};

async function showSelection(player: alt.Player) {
    const playerWorld = Rebar.player.useWorld(player);
    Rebar.player.useNative(player).invoke('displayRadar', false);
    player.emit(CharacterSelectEvents.toClient.toggleControls, false);

    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        player.kick('');
        return;
    }

    const characters = await db.getMany<Character>(
        { account_id: accDocument.getField('_id') },
        CollectionNames.Characters,
    );

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

    player.dimension = player.id + 1;
    showSelection(player);
}

function openCreator(player: alt.Player) {
    const playerWorld = Rebar.player.useWorld(player);
    playerWorld.setScreenFade(0);
    player.emit(CharacterSelectEvents.toClient.toggleControls, true);
    PluginAPI.invokeCreator(player);
}

async function init() {
    const auth = await api.getAsync('discord-auth-api');
     const creator = await api.getAsync('character-creator-api');
    creator.onExit(showSelection);
    auth.onLogin(handleLogin);
    alt.onClient(CharacterSelectEvents.toServer.openCreator, openCreator);
}

init();
