import * as alt from 'alt-client';
import * as native from 'natives';
import { useControlMenuAPI } from '@Plugins/diamond-menu/client/api.js';

import '../translate/index.js';
import { useTranslate } from '@Shared/translate.js';

const { t } = useTranslate();

async function init() {
    const menuApi = useControlMenuAPI();

    menuApi.add({
        name: t('vehiclecontrols:vehicle'),
        icon: 'icon-directions_car',
        condition: async () => {
            return alt.Player.local.vehicle ? true : false;
        },
        submenu: [
            {
                name: t('vehiclecontrols:engine'),
                icon: 'icon-engine-fill',
                onClick: () => {
                    const vehicle = alt.Player.local.vehicle;
                    if (!vehicle) return;
                    native.setVehicleEngineOn(vehicle, !vehicle.engineOn, false, true);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:door'),
                icon: 'icon-door-front-left',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 0);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 0) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 0, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 0, false, false);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:door'),
                icon: 'icon-door-front-right',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 1);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 1) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 1, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 1, false, false);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:door'),
                icon: 'icon-door-back-left',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 2);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 2) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 2, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 2, false, false);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:door'),
                icon: 'icon-door-back-right',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 3);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 3) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 3, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 3, false, false);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:bonnet'),
                icon: 'icon-hood-open',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 4);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 4) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 4, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 4, false, false);
                },
                disableCloseOnClick: true,
            },
            {
                name: t('vehiclecontrols:boot'),
                icon: 'icon-trunk-open',
                condition: async () => {
                    return native.getIsDoorValid(alt.Player.local.vehicle, 5);
                },
                onClick: () => {
                    if (!alt.Player.local.vehicle) return;
                    if (native.getVehicleDoorAngleRatio(alt.Player.local.vehicle, 5) > 0.1) native.setVehicleDoorShut(alt.Player.local.vehicle, 5, false);
                    else native.setVehicleDoorOpen(alt.Player.local.vehicle, 5, false, false);
                },
                disableCloseOnClick: true,
            },
        ],
    });
}

init();
