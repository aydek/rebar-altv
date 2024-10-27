import { useRebarClient } from '@Client/index.js';
import * as alt from 'alt-client';
import { SettingsEvents } from '../shared/events.js';
import { useSettingsAPI } from './api.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

webview.onRpc(SettingsEvents.toClient.fetchItems, () => {
    const settings = useSettingsAPI().getAll();

    settings.forEach((setting) => {
        setting.options.forEach((item) => {
            const val = alt.LocalStorage.get(item.key);
            if (val !== undefined && val !== null) {
                item.value = val;
            }
        });
    });
    return settings;
});

webview.on(SettingsEvents.toClient.close, () => {
    webview.hide('Settings');
});
