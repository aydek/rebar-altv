import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';
import './api.js';
import { ChatEvents } from '../shared/events.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const api = Rebar.useApi();

async function handleSpawn(player: alt.Player, character: Character) {
    const webview = Rebar.player.useWebview(player);
    webview.show('Chat', 'overlay');
    await webview.isReady('Chat', 'overlay');

    const commands = await messenger.commands.getCommands(player);
    webview.emit(ChatEvents.toWebview.commands, commands);
}

async function init() {
    const charSelect = await api.getAsync('character-select-api');
    charSelect.onSelect(handleSpawn);
}

init();
