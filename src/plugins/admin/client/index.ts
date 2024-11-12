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
            {
                name: 'Weather',
                icon: 'icon-wb_sunny',

                submenu: [
                    {
                        name: 'Blizzard',
                        icon: 'icon-snowing',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'BLIZZARD');
                        },
                    },
                    {
                        name: 'Clear',
                        icon: 'icon-skyatlas',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'CLEAR');
                        },
                    },
                    {
                        name: 'Clearing',
                        icon: 'icon-skyatlas',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'CLEARING');
                        },
                    },
                    {
                        name: 'Clouds',
                        icon: 'icon-cloud1',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'CLOUDS');
                        },
                    },
                    {
                        name: 'Sunny',
                        icon: 'icon-wb_sunny',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'EXTRASUNNY');
                        },
                    },
                    {
                        name: 'Fog',
                        icon: 'icon-smoke-bomb',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'FOGGY');
                        },
                    },
                    {
                        name: 'Halloween',
                        icon: 'icon-fish-monster',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'HALLOWEEN');
                        },
                    },
                    {
                        name: 'Neutral',
                        icon: 'icon-sentiment_neutral',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'NEUTRAL');
                        },
                    },
                    {
                        name: 'Overcast',
                        icon: 'icon-icloud',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'OVERCAST');
                        },
                    },
                    {
                        name: 'Rain',
                        icon: 'icon-raining',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'RAIN');
                        },
                    },

                    {
                        name: 'Smog',
                        icon: 'icon-icloud',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'SMOG');
                        },
                    },
                    {
                        name: 'Snow',
                        icon: 'icon-snowflake-o',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'SNOW');
                        },
                    },
                    {
                        name: 'Snow light',
                        icon: 'icon-snowflake-o',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'SNOWLIGHT');
                        },
                    },
                    {
                        name: 'Thunder',
                        icon: 'icon-thunder-cloud',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'THUNDER');
                        },
                    },
                    {
                        name: 'Xmas',
                        icon: 'icon-snowman',
                        disableCloseOnClick: true,
                        onClick: () => {
                            alt.emitServer(AdminEvents.toServer.setWeather, 'XMAS');
                        },
                    },
                ],
            },
        ],
    });
}

init();
