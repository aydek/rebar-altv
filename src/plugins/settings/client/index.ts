import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { SettingsEvents } from '../shared/events.js';
import { getSettings } from './settings.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

function handleSettings(type: string, key: string, value: any) {
    switch (type) {
        case 'chat':
            const chatSettings = api.get('chat-api');
            let current = chatSettings.get();
            current[key] = value;
            chatSettings.set(current);
            break;

        default:
            break;
    }
}

function open() {
    if (!alt.getMeta('settings-open')) {
        alt.toggleGameControls(false);
        webview.show('Settings', 'page', true);
        alt.setMeta('settings-open', true);
        getSettings();
    }
}

function close() {
    if (alt.getMeta('settings-open')) {
        alt.deleteMeta('settings-open');
        alt.toggleGameControls(true);
    }
}

async function init() {
    const menuAPI = await api.getAsync('control-menu-api');
    menuAPI.add({
        name: 'Settings',
        icon: 'icon-settings',
        onClick: open,
    });

    webview.onClose('Settings', close);
    webview.on(SettingsEvents.toClient.setSetting, handleSettings);
}

init();
