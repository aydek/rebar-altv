import * as alt from 'alt-client';
import { useHudAPI } from '@Plugins/hud/client/api.js';

const hudAPI = useHudAPI();

hudAPI.addStatsItem([
    {
        id: 'stat-food',
        icon: 'icon-fastfood',
        color: '#ed9600',
        hidden: () => {
            return alt.getLocalMeta('food') > 80;
        },
        value: () => alt.getLocalMeta('food'),
        min: 0,
        max: 100,
        active: () => alt.getLocalMeta('food') < 15,
        activeColor: '#ed9600',
    },
    {
        id: 'stat-water',
        icon: 'icon-local_drink',
        color: '#00a9ff',
        hidden: () => {
            return alt.getLocalMeta('water') > 80;
        },
        value: () => alt.getLocalMeta('water'),
        min: 0,
        max: 100,
        active: () => alt.getLocalMeta('water') < 15,
        activeColor: '#00a9ff',
    },
]);
