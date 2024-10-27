import { useRebarClient } from '@Client/index.js';
import './api.js';
import './events.js';
import { useSettingsAPI } from './api.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

async function init() {
    const menuAPI = await api.getAsync('diamond-menu-api');
    menuAPI.add({
        name: 'Settings',
        icon: 'icon-settings',
        onClick: useSettingsAPI().open,
    });
}

init();
