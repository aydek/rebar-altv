import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { VitalityEvents } from '../shared/events.js';
import { IVitals } from '../shared/declarations.js';
import { VitalityConfig } from '../shared/config.js';
import { useVitalityAPI } from './api.js';

declare module '@Shared/types/character.js' {
    export interface Character {
        vitals?: IVitals;
    }
}

const Rebar = useRebar();
const vitality = useVitalityAPI();

async function handleTick(player: alt.Player, sprintSeconds: number) {
    let currentVitals: IVitals = {
        food: 100,
        water: 100,
    };
    if (!player || !player.valid || player.isDead) return;

    const document = Rebar.document.character.useCharacter(player);
    const data = document.get();

    if (!data) return;

    if (data.vitals) {
        if (data.vitals.food) currentVitals.food = data.vitals.food;
        if (data.vitals.water) currentVitals.water = data.vitals.water;
    } else {
        await document.set('vitals', currentVitals);
    }

    const foodRate = VitalityConfig.foodRate;
    const waterRate = sprintSeconds > 0 ? VitalityConfig.waterRate + sprintSeconds / 5 : VitalityConfig.waterRate;

    currentVitals.food = currentVitals.food - foodRate;
    currentVitals.water = currentVitals.water - waterRate;

    for (const key in currentVitals) {
        if (currentVitals.hasOwnProperty(key)) {
            if (currentVitals[key] < 0) {
                currentVitals[key] = 0;
            }
            onUpdate(player, key as keyof IVitals, currentVitals[key]);
        }
    }

    vitality.set(player, 'food', currentVitals.food);
    vitality.set(player, 'water', currentVitals.water);
}

function onUpdate(player: alt.Player, key: keyof IVitals, value: number) {
    if (key === 'food' && !player.isDead && value < 20) {
        player.health = player.health - 2 / value;
    }
    if (key === 'water' && !player.isDead) {
        if (value < 50) player.emit(VitalityEvents.toClient.setStat, 'stamina', (30 / 100) * value);
        else player.emit(VitalityEvents.toClient.setStat, 'stamina', 15);
    }
}

alt.onClient(VitalityEvents.toServer.tick, handleTick);
alt.on('playerFullySpawned', (player: alt.Player) => {
    handleTick(player, 0);
    alt.emitClient(player, VitalityEvents.toClient.startTick);
});
