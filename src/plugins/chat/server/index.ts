import * as alt from 'alt-server';
import * as Utility from '@Shared/utility/index.js';
import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';

import { ChatEvents } from '../shared/events.js';
import { chatConfig } from '../shared/config.js';

import './api.js';

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

function handlePlayerMessage(player: alt.Player, msg: string) {
    for (let target of alt.Player.all) {
        if (!chatConfig.globalChat && Utility.vector.distance2d(player.pos, target.pos) > chatConfig.chatDistance) {
            continue;
        }

        if (!target.valid) {
            continue;
        }

        const character = Rebar.document.character.useCharacter(player).get();

        messenger.message.send(target, { type: 'player', content: msg, author: character.name + ` (${player.id})` });
    }
}

async function init() {
    const charSelect = await api.getAsync('character-select-api');
    charSelect.onSelect(handleSpawn);
    alt.on('rebar:playerSendMessage', handlePlayerMessage);
}

init();
