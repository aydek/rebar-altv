import * as alt from 'alt-client';
import * as native from 'natives';
import { VitalityEvents } from '../shared/events.js';
import { VitalityConfig } from '../shared/config.js';

import './hudItems.js';

let interval: undefined | number = undefined;
let sprintInterval: undefined | number = undefined;
let sprintSeconnds = 0;

function handleStart() {
    interval = alt.setInterval(() => {
        alt.emitServer(VitalityEvents.toServer.tick, sprintSeconnds);
        sprintSeconnds = 0;
    }, VitalityConfig.timeBetweenUpdatesMS);

    sprintInterval = alt.setInterval(() => {
        if (native.isPedSprinting(alt.Player.local)) {
            sprintSeconnds += 0.1;
        }
    }, 100);
}

alt.onServer(VitalityEvents.toClient.setStat, (name: alt.StatName, value: number) => {
    alt.setStat(name, value);
});

alt.onServer(VitalityEvents.toClient.startTick, handleStart);
alt.on('disconnect', () => {
    if (interval !== undefined) {
        alt.clearInterval(interval);
    }
    if (sprintInterval !== undefined) {
        alt.clearInterval(sprintInterval);
    }
});
