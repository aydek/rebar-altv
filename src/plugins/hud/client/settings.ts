import { useSettingsAPI } from '@Plugins/settings/client/api.js';
import { HudSettingsKeys } from '../shared/settings.js';
import { useTranslate } from '@Shared/translate.js';

import '../translate/translate.js';

const settingsApi = useSettingsAPI();
const { t } = useTranslate();

settingsApi.add({
    title: t('hud:hud'),
    icon: 'icon-fit_screen',
    options: [
        {
            title: t('hud:hide:all'),
            type: 'checkbox',
            key: HudSettingsKeys.allHidden,
            value: false,
        },
        {
            title: t('hud:hide:compass'),
            type: 'checkbox',
            key: HudSettingsKeys.compassHidden,
            value: false,
        },
        {
            title: t('hud:hide:speedometer'),
            type: 'checkbox',
            key: HudSettingsKeys.speedoHidden,
            value: false,
        },
        {
            title: t('hud:hide:stats'),
            type: 'checkbox',
            key: HudSettingsKeys.statsHidden,
            value: false,
        },
    ],
});
