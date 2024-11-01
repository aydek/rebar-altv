import { useRebarClient } from '@Client/index.js';
import * as alt from 'alt-client';
import * as native from 'natives';
import { HudEvents } from '../shared/events.js';
import { HudSettingsKeys } from '../shared/settings.js';
import { electricCarModels, VehicleClass } from '../shared/const.js';
import { ISpeedoData } from '../shared/types.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

let lastPosition: alt.IVector3 = new alt.Vector3(0, 0, -200);

export function updateSpeedometer() {
    if (alt.LocalStorage.get(HudSettingsKeys.speedoHidden)) {
        return;
    }

    if (!alt.Player.local.vehicle) {
        webview.emit(HudEvents.toWebview.setSpeedo, [{ key: 'show', value: false }]);
        return;
    }

    const veh = alt.Player.local.vehicle;

    if (native.getVehicleClass(veh) === VehicleClass.Cycles || native.getVehicleClass(veh) === VehicleClass.Trains) {
        webview.emit(HudEvents.toWebview.setSpeedo, [{ key: 'show', value: false }]);
        return;
    }

    if (!veh.engineOn) {
        webview.emit(HudEvents.toWebview.setSpeedo, [
            { key: 'engine', value: veh.engineOn },
            { key: 'show', value: true },
        ]);
        return;
    }

    const isMetric = native.getProfileSetting(227);
    const currentSpeed = native.getEntitySpeed(veh.scriptID);

    let realSpeed = parseInt((currentSpeed * (isMetric ? 3.6 : 2.236936)).toFixed(0));

    const gear = veh.gear;

    const isElectric = electricCarModels.includes(veh.model);

    let realGear = realSpeed > 0 && gear === 0 ? 'R' : gear === 0 ? 'N' : gear.toString();

    if (isElectric && gear > 0) {
        realGear = 'D';
    }

    const lights = native.getVehicleLightsState(veh);
    const lightState = lights[2] ? 2 : lights[1] ? 1 : 0;
    let rpm = veh.engineOn ? veh.rpm : 0;

    // const fuel = veh.getSyncedMeta('fuel') === undefined ? 0 : veh.getSyncedMeta('fuel');

    // /** Mileage */

    // const onWheels = native.isVehicleOnAllWheels(veh);
    // const driver = native.getPedInVehicleSeat(veh, -1, false);
    // const availableForMileage =
    //     native.getVehicleClass(veh) !== VehicleClass.Cycles &&
    //     native.getVehicleClass(veh) !== VehicleClass.Boats &&
    //     native.getVehicleClass(veh) !== VehicleClass.Helicopters &&
    //     native.getVehicleClass(veh) !== VehicleClass.Planes &&
    //     native.getVehicleClass(veh) !== VehicleClass.Service &&
    //     native.getVehicleClass(veh) !== VehicleClass.Trains;

    // if (onWheels && alt.Player.local.scriptID === driver && availableForMileage) {
    //     const dist = distance(alt.Player.local.vehicle.pos, lastPosition);

    //     if (dist < 5 && dist > 0) {
    //         let add = dist;
    //         const current = veh.getSyncedMeta('mileage') as number;
    //         add = add / 3500 + (current !== undefined ? current : 0);
    //         alt.emitServer(VehSyncMetaEvents.set, veh, 'mileage', add);
    //     }

    //     lastPosition = veh.pos;
    // }

    // const mileageMeta = veh.getSyncedMeta('mileage') as number;
    // const mileage = mileageMeta !== undefined ? mileageMeta * (isMetric ? 3.6 : 2.236936) : 0;

    let units = 'KMH';

    if (
        native.getVehicleClass(veh) === VehicleClass.Planes ||
        native.getVehicleClass(veh) === VehicleClass.Boats ||
        native.getVehicleClass(veh) === VehicleClass.Helicopters
    ) {
        units = 'KN';
        realSpeed = parseInt((currentSpeed * 1.943844).toFixed(0));
        if (native.getVehicleClass(veh) === VehicleClass.Helicopters || native.getVehicleClass(veh) === VehicleClass.Planes) {
            rpm = veh.pos.z / 1000;
            if (rpm < 0) rpm = 0;
            if (rpm > 1) rpm = 1;
        }
    } else {
        units = isMetric ? 'KMH' : 'MPH';
    }

    type SpeedoDataItem<T extends keyof ISpeedoData> = {
        key: T;
        value: ISpeedoData[T];
    };

    const data: Array<SpeedoDataItem<keyof ISpeedoData>> = [
        { key: 'show', value: true },
        { key: 'type', value: isElectric ? 'electric' : 'gas' },
        { key: 'units', value: units },
        { key: 'fuel', value: 55 },
        { key: 'tank', value: 100 },
        { key: 'engine', value: veh.engineOn },
        { key: 'locked', value: veh.lockState === alt.VehicleLockState.Locked },
        { key: 'belt', value: false },
        { key: 'mileage', value: 0 },
        { key: 'speed', value: realSpeed },
        { key: 'gear', value: realGear },
        { key: 'rpm', value: rpm },
        { key: 'lights', value: lightState },
    ];

    webview.emit(HudEvents.toWebview.setSpeedo, data);
}
