import { useSettingsAPI } from '@Plugins/settings/client/api.js';
import { HudSettingsKeys } from '../shared/settings.js';

const settingsApi = useSettingsAPI();

settingsApi.add({
    title: 'Hud',
    icon: 'icon-fit_screen',
    options: [
        {
            title: 'Hide hud',
            type: 'checkbox',
            key: HudSettingsKeys.allHidden,
            value: false,
        },
        {
            title: 'Hide compass',
            type: 'checkbox',
            key: HudSettingsKeys.compassHidden,
            value: false,
        },
        {
            title: 'Hide speedometer',
            type: 'checkbox',
            key: HudSettingsKeys.speedoHidden,
            value: false,
        },
        {
            title: 'Hide stats',
            type: 'checkbox',
            key: HudSettingsKeys.statsHidden,
            value: false,
        },
    ],
});
