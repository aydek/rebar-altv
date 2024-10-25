import * as alt from 'alt-client';
import './noclip.js';
import { useRebarClient } from '@Client/index.js';
import { NoClip } from './noclip.js';
import { AdminEvents } from '../shared/events.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

async function init() {
    const menuAPI = await api.getAsync('diamond-menu-api');

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
