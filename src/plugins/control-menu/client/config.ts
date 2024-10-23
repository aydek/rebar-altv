import { IMenuItem } from '../shared/types.js';
import { onClick } from './functions.js';

const menuItems: IMenuItem[] = [
    {
        name: 'Settings',
        icon: 'icon-settings',
        callback: () => onClick('settings'),
    },
    {
        name: 'Scoreboard',
        icon: 'icon-score',
        callback: () => onClick('settings'),
    },
];

export function getMenuItems() {
    return menuItems;
}
