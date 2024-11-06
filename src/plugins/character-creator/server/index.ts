import * as alt from 'alt-server';
import * as PluginAPI from './api.js';
import { useRebar } from '@Server/index.js';
import { CharacterCreatorEvents } from '../shared/events.js';
import { CollectionNames } from '@Server/document/shared.js';
import { Character } from '@Shared/types/character.js';
import { Appearance } from '@Shared/types/appearance.js';
import { ClothingComponent } from '@Shared/types/clothingComponent.js';
import { useCharacterSelectAPI } from '@Plugins/character-select/server/api.js';

const Rebar = useRebar();
const api = Rebar.useApi();
const db = Rebar.database.useDatabase();
const sessionKey = 'character-creator';

declare module '@Shared/types/character.js' {
    export interface Character {
        age?: number;
        newCharacter?: boolean;
    }
}

async function showCreator(player: alt.Player) {
    player.setMeta(sessionKey, true);
    const playerWorld = Rebar.player.useWorld(player);
    player.emit(CharacterCreatorEvents.toClient.tooglePedEdit);
    player.visible = false;

    const webview = Rebar.player.useWebview(player);
    webview.show('CharacterCreator', 'page');

    await alt.Utils.wait(500);
    playerWorld.clearScreenFade(500);
}

function handdleExit(player: alt.Player) {
    player.deleteMeta(sessionKey);
    PluginAPI.invokeExit(player);
}

async function handleNameCheck(player: alt.Player, firstName: string, lastName: string) {
    if (!player.getMeta(sessionKey)) {
        player.kick('');
        return;
    }
    const webview = Rebar.player.useWebview(player);
    const combined = `${firstName}_${lastName}`;

    const document = await db.get<Character>({ name: combined }, CollectionNames.Characters);

    webview.emit(CharacterCreatorEvents.toServer.nameCheck, document ? true : false);
}

async function handleSave(player: alt.Player, firstName: string, lastName: string, age: number, appearance: Appearance, clothes: ClothingComponent[]) {
    if (!player.getMeta(sessionKey)) {
        player.kick('');
        return;
    }
    const combined = `${firstName}_${lastName}`;
    const accDocument = Rebar.document.account.useAccount(player);
    if (!accDocument) {
        player.kick('');
        return;
    }

    const fClothes = clothes.filter((item) => item.drawable > -1);

    // Create the character, then show the selection again.
    const _id = await db.create<Character>(
        {
            account_id: accDocument.getField('_id'),
            name: combined,
            age,
            appearance: appearance,
            clothing: fClothes,
            newCharacter: true,
            secondsPlayed: 0,
            lastPlayed: Date.now(),
            cash: 0,
        },
        CollectionNames.Characters,
    );
    if (!_id) {
        player.kick('');
        return;
    }
    alt.emitClient(player, CharacterCreatorEvents.toClient.creationDone);
}

async function init() {
    const select = useCharacterSelectAPI();
    select.onOpenCreator(showCreator);
    alt.onClient(CharacterCreatorEvents.toServer.exit, handdleExit);
    alt.onClient(CharacterCreatorEvents.toServer.nameCheck, handleNameCheck);
    alt.onClient(CharacterCreatorEvents.toServer.save, handleSave);
}

init();
