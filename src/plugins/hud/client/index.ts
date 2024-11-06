import { useRebarClient } from '@Client/index.js';
import * as alt from 'alt-client';
import { HudEvents } from '../shared/events.js';
import { HudSettingsKeys } from '../shared/settings.js';

import { updateCompass } from './compass.js';
import { updateSpeedometer } from './speedometer.js';
import { updateStats } from './stats.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();
let interval = undefined;

webview.on(HudEvents.toClient.startInterval, () => {
    if (interval !== undefined) {
        alt.clearInterval(interval);
        interval = undefined;
    }

    interval = alt.setInterval(render, 50);
});

function render() {
    if (alt.LocalStorage.get(HudSettingsKeys.allHidden)) {
        return;
    }

    updateCompass();
    updateSpeedometer();
    updateStats();
}
