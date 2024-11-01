import { useRebarClient } from '@Client/index.js';
import * as alt from 'alt-client';
import * as native from 'natives';
import { HudEvents } from '../shared/events.js';
import { HudSettingsKeys } from '../shared/settings.js';
import { ICompassData } from '../shared/types.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

export function updateCompass() {
    if (alt.LocalStorage.get(HudSettingsKeys.compassHidden)) {
        return;
    }

    const cam = native.getGameplayCamRot(2);

    let heading = cam.z % 360;

    if (heading < 0) heading += 360;

    const street = native.getStreetNameAtCoord(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z);
    const streetName = native.getStreetNameFromHashKey(street[1]);
    const crossingName = native.getStreetNameFromHashKey(street[2]);
    const zoneName = native.getFilenameForAudioConversation(native.getNameOfZone(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z));

    let crossing = '';

    if (crossingName != '') {
        crossing = `/ ${crossingName}`;
    } else {
        crossing = '';
    }

    type CompassDataItem<T extends keyof ICompassData> = {
        key: T;
        value: ICompassData[T];
    };

    const data: Array<CompassDataItem<keyof ICompassData>> = [
        { key: 'heading', value: heading },
        { key: 'street', value: streetName },
        { key: 'area', value: zoneName },
        { key: 'crossing', value: crossing },
    ];

    webview.emit(HudEvents.toWebview.setCompass, data);
}
