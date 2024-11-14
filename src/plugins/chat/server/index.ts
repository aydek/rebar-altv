import * as alt from 'alt-server';
import * as Utility from '@Shared/utility/index.js';
import { useRebar } from '@Server/index.js';
import { ChatEvents } from '../shared/events.js';
import { chatConfig } from '../shared/config.js';

import './api.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();

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

function showOverlay(player: alt.Player) {
    const webview = Rebar.player.useWebview(player);
    webview.show('Chat', 'overlay');
}

alt.onRpc(ChatEvents.toServer.getCommands, async (player: alt.Player) => {
    const commands = await messenger.commands.getCommands(player);
    return commands;
});

alt.on('rebar:playerCharacterBound', showOverlay);
alt.on('rebar:playerSendMessage', handlePlayerMessage);
