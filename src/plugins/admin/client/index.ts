import * as alt from 'alt-client';
import './noclip.js';
import { NoClip } from './noclip.js';
import { AdminEvents } from '../shared/events.js';
import { useControlMenuAPI } from '@Plugins/diamond-menu/client/api.js';

function init() {
    const menuAPI = useControlMenuAPI();

    menuAPI.add({
        name: 'Admin',
        icon: 'icon-admin_panel_settings',
        onClick: () => {},
        condition: async () => {
            try {
                const result = await alt.emitRpc(AdminEvents.rpctoServer.isAdmin);
                return result ? true : false;
            } catch (e) {
                alt.log(e);
                return true;
            }
        },
        submenu: [
            {
                name: 'Noclip',
                icon: 'icon-flying-fox',
                onClick: () => NoClip.toggle(),
            },
        ],
    });
}

init();
