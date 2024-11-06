import * as alt from 'alt-server';
import { Character } from '@Shared/types/character.js';

type PlayerCharacterCallback = (player: alt.Player, character: Character) => void;
type CreatorOpenCallback = (player: alt.Player) => void;

const selectCallbacks: Array<PlayerCharacterCallback> = [];
const openCreatorCallbacks: Array<CreatorOpenCallback> = [];

export function invokeSelect(player: alt.Player, character: Character) {
    for (let cb of selectCallbacks) {
        cb(player, character);
    }
}

export function invokeCreator(player: alt.Player) {
    for (let cb of openCreatorCallbacks) {
        cb(player);
    }
}

export function useCharacterSelectAPI() {
    function onSelect(callback: PlayerCharacterCallback) {
        selectCallbacks.push(callback);
    }

    function onOpenCreator(callback: CreatorOpenCallback) {
        openCreatorCallbacks.push(callback);
    }

    return {
        onSelect,
        onOpenCreator,
    };
}
