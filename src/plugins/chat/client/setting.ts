import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { chatSettingsKeys } from '../shared/config.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

async function init() {
    const settingsApi = await api.getAsync('settings-api');

    settingsApi.add({
        title: 'Chat',
        icon: 'icon-chat',
        options: [
            {
                title: 'Timestamps',
                type: 'checkbox',
                key: chatSettingsKeys.timestamps,
                value: false,
            },
            {
                title: 'Automatically hide',
                type: 'checkbox',
                key: chatSettingsKeys.autohide,
                value: true,
            },
            {
                title: 'Font size',
                type: 'slider',
                key: chatSettingsKeys.fontsize,
                value: 1.2,
                min: 0.7,
                max: 2,
                step: 0.1,
            },
        ],
    });
}

init();
