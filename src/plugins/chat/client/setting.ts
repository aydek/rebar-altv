import { useTranslate } from '@Shared/translate.js';
import { chatSettingsKeys } from '../shared/config.js';
import { useSettingsAPI } from '@Plugins/settings/client/api.js';
import '../translate/index.js';

const settingsApi = useSettingsAPI();
const { t } = useTranslate();

settingsApi.add({
    title: 'Chat',
    icon: 'icon-chat',
    options: [
        {
            title: t('chat:setting:timestaps'),
            type: 'checkbox',
            key: chatSettingsKeys.timestamps,
            value: false,
        },
        {
            title: t('chat:setting:autohide'),
            type: 'checkbox',
            key: chatSettingsKeys.autohide,
            value: true,
        },
        {
            title: t('chat:setting:fontsize'),
            type: 'slider',
            key: chatSettingsKeys.fontsize,
            value: 1.2,
            min: 0.7,
            max: 2,
            step: 0.1,
        },
    ],
});
