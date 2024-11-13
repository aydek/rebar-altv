import { chatSettingsKeys } from '../shared/config.js';
import { useSettingsAPI } from '@Plugins/settings/client/api.js';

const settingsApi = useSettingsAPI();

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
