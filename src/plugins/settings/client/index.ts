import './api.js';
import './events.js';
import { useSettingsAPI } from './api.js';
import { useControlMenuAPI } from '@Plugins/diamond-menu/client/api.js';

async function init() {
    const menuAPI = useControlMenuAPI();
    menuAPI.add({
        name: 'Settings',
        icon: 'icon-settings',
        onClick: useSettingsAPI().open,
    });
}

init();
