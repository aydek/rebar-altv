import * as alt from 'alt-server';
import { ChatEvents } from '../shared/events.js';
import { useApi } from '@Server/api/index.js';

type PlayerChatCallback = (player: alt.Player, isChatting: boolean) => void;

const sessionKey = 'is-player-chatting';
const callbacks: PlayerChatCallback[] = [];

function handleIsChatting(player: alt.Player, value: boolean) {
    player.setMeta(sessionKey, value);

    for (let cb of callbacks) {
        cb(player, value);
    }
}

export function useChatAPI() {
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

declare global {
    export interface ServerPlugin {
        ['chat-api']: ReturnType<typeof useChatAPI>;
    }
}

useApi().register('chat-api', useChatAPI());

alt.onClient(ChatEvents.toServer.isChatting, handleIsChatting);
