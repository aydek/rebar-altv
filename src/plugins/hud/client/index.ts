import * as alt from 'alt-client';
import * as native from 'natives';
import { useRebarClient } from '@Client/index.js';

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

    alt.setMinimapComponentPosition('minimap', 'L', 'B', -0.0045, -0.022, 0.15, 0.188888);
    alt.setMinimapComponentPosition('minimap_mask', 'L', 'B', 0.02, 0.012, 0.111, 0.159);
    alt.setMinimapComponentPosition('minimap_blur', 'L', 'B', -0.03, 0.002, 0.266, 0.237);

    native.setBigmapActive(true, false);
    native.setBigmapActive(false, false);
});

function render() {
    if (alt.LocalStorage.get(HudSettingsKeys.allHidden)) {
        return;
    }

    if (webview.isAnyPageOpen()) {
        return;
    }

    updateCompass();
    updateSpeedometer();
    updateStats();
}
