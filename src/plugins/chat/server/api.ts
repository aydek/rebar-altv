import * as alt from 'alt-server';
import { ChatEvents } from '../shared/events.js';

type PlayerChatCallback = (player: alt.Player, isChatting: boolean) => void;

const sessionKey = 'is-player-chatting';
const callbacks: PlayerChatCallback[] = [];

function handleIsChatting(player: alt.Player, value: boolean) {
    player.setMeta(sessionKey, value);

    for (let cb of callbacks) {
        cb(player, value);
    }
}

function useChatAPI() {
    function isChatting(player: alt.Player) {
        return player.getMeta(sessionKey) ? true : false;
    }

    function onChatStatusChange(callback: PlayerChatCallback) {
        callbacks.push(callback);
    }

    return {
        isChatting,
        onChatStatusChange,
    };
}

alt.onClient(ChatEvents.toServer.isChatting, handleIsChatting);
