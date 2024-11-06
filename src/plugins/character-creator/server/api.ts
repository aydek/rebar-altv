import * as alt from 'alt-server';

type PlayerCharacterCallback = (player: alt.Player) => void;

const exitCallbacks: Array<PlayerCharacterCallback> = [];

export function invokeExit(player: alt.Player) {
    for (let cb of exitCallbacks) {
        cb(player);
    }
}

export function useCreatorAPI() {
    function onExit(callback: PlayerCharacterCallback) {
        exitCallbacks.push(callback);
    }

    return {
        onExit,
    };
}
