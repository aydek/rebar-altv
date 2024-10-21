import * as alt from 'alt-server';

import { useRebar } from '@Server/index.js';

declare module '@Shared/types/character.js' {
    export interface Character {
        lastPlayed?: number;
        secondsPlayed?: number;
    }
}

const Rebar = useRebar();
let isUpdatingVehicles = false;
let isUpdatingPlayers = false;

function updatePlayers() {
    if (isUpdatingPlayers) {
        return;
    }

    isUpdatingPlayers = true;

    for (let player of alt.Player.all) {
        if (!player.valid) {
            continue;
        }

        const document = Rebar.document.character.useCharacter(player);
        if (!document.get()) {
            continue;
        }

        const ammo: { [key: string]: number } = {};
        for (let weapon of player.weapons) {
            ammo[weapon.hash] = player.getAmmo(weapon.hash);
        }

        let currentSeconds = document.getField('secondsPlayed');

        if (!currentSeconds || currentSeconds === null) {
            currentSeconds = 0;
        }

        Rebar.player.useWeapon(player).save();
        Rebar.player.useState(player).save();
        document.set('lastPlayed', Date.now());
        document.set('secondsPlayed', currentSeconds + 5);
    }

    isUpdatingPlayers = false;
}

function updateVehicles() {
    if (isUpdatingVehicles) {
        return;
    }

    isUpdatingVehicles = true;

    for (let vehicle of alt.Vehicle.all) {
        if (!vehicle.valid) {
            continue;
        }

        const document = Rebar.document.vehicle.useVehicle(vehicle);
        if (!document.get()) {
            continue;
        }

        Rebar.vehicle.useVehicle(vehicle).save();
    }

    isUpdatingVehicles = false;
}

alt.setInterval(updatePlayers, 5000);
alt.setInterval(updateVehicles, 5000);
