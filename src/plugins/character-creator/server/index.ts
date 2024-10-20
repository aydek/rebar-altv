import * as alt from 'alt-server';
import * as PluginAPI from './api.js';
import { useRebar } from '@Server/index.js';
import { CharacterCreatorEvents } from '../shared/events.js';

const Rebar = useRebar();
const api = Rebar.useApi();
const db = Rebar.database.useDatabase();

async function showCreator(player: alt.Player) {
    const playerWorld = Rebar.player.useWorld(player);
    player.emit(CharacterCreatorEvents.toClient.tooglePedEdit);
    player.visible = false;
    Rebar.player.useNative(player).invoke('displayRadar', false);
    const webview = Rebar.player.useWebview(player);
    webview.show('CharacterCreator', 'page');

    await alt.Utils.wait(500);
    playerWorld.clearScreenFade(500);
}

function handdleExit(player: alt.Player) {
    PluginAPI.invokeExit(player);
}

async function init() {
    const select = await api.getAsync('character-select-api');
    select.onOpenCreator(showCreator);
    alt.onClient(CharacterCreatorEvents.toServer.exit, handdleExit);
}

init();
