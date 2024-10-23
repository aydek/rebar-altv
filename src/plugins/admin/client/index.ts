import './noclip.js';
import { useRebarClient } from '@Client/index.js';
import { NoClip } from './noclip.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

async function init() {
    const menuAPI = await api.getAsync('control-menu-api');

    menuAPI.add({
        name: 'Admin',
        icon: 'icon-admin_panel_settings',
        onClick: () => {},
        submenus: [
            {
                name: 'Noclip',
                icon: 'icon-flying-fox',
                onClick: () => NoClip.toggle(),
            },
        ],
    });
}

init();
