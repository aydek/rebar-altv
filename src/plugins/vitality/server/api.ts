import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { IVitals } from '../shared/declarations.js';

const Rebar = useRebar();

export function useVitalityAPI() {
    function setVital(player: alt.Player, key: keyof IVitals, value: number) {
        const document = Rebar.document.character.useCharacter(player);
        const data = document.get();

        const current = data.vitals;

        current[key] = value;

        player.setLocalMeta(key, value);
        document.set('vitals', current);
    }

    function getVital(player: alt.Player, key: keyof IVitals) {
        return player.getLocalMeta(key);
    }

    return {
        set: setVital,
        get: getVital,
    };
}
