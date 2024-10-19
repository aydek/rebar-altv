import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

type PlayerCharacterCallback = (player: alt.Player) => void;

const Rebar = useRebar();

const exitCallbacks: Array<PlayerCharacterCallback> = [];

export function invokeExit(player: alt.Player) {
    for (let cb of exitCallbacks) {
        cb(player);
    }
}

function useApi() {
    function onExit(callback: PlayerCharacterCallback) {
        exitCallbacks.push(callback);
    }

    return {
        onExit,
    };
}

declare global {
    export interface ServerPlugin {
        ['character-creator-api']: ReturnType<typeof useApi>;
    }
}

Rebar.useApi().register('character-creator-api', useApi());
