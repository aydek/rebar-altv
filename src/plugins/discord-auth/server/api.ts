import alt from "alt-server";
import {Account} from "@Shared/types/index.js";

type PlayerCallback = (player: alt.Player, account: Account) => void;


const loginCallbacks: Array<PlayerCallback> = [];

export function invokeLogin(player: alt.Player, account: Account) {
    for ( const cb of loginCallbacks ) {
        cb(player, account);
    }
}


export function useDiscordAuthAPI() {
    function onLogin(callback: (player: alt.Player) => void) {
        loginCallbacks.push(callback);
    }

    return {
        onLogin,
    };
}

