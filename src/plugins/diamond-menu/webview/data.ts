import { IDiamondMenuItem } from '../shared/types.js';

export const dummyItems: IDiamondMenuItem[] = [
    {
        name: 'Settings',
        icon: 'icon-settings',
        submenu: [
            { name: 'Settings', icon: 'icon-settings' },
            { name: 'Settings', icon: 'icon-settings' },
            { name: 'Settings', icon: 'icon-settings' },
        ],
    },
    {
        name: 'Admin',
        icon: 'icon-admin_panel_settings',
        submenu: [
            {
                name: 'Admin',
                icon: 'icon-admin_panel_settings',
                submenu: [
                    { name: 'Chat', icon: 'icon-settings' },
                    { name: 'Chat', icon: 'icon-admin_panel_settings' },
                    { name: 'Chat', icon: 'icon-chat' },
                ],
            },
            {
                name: 'Admin',
                icon: 'icon-chat',
                submenu: [
                    { name: 'Chat', icon: 'icon-settings' },
                    { name: 'Chat', icon: 'icon-admin_panel_settings' },
                    { name: 'Chat', icon: 'icon-chat' },
                ],
            },
            {
                name: 'Admin',
                icon: 'icon-settings',
                submenu: [
                    { name: 'Chat', icon: 'icon-settings' },
                    { name: 'Chat', icon: 'icon-admin_panel_settings' },
                    { name: 'Chat', icon: 'icon-chat' },
                ],
            },
        ],
    },
    {
        name: 'Chat',
        icon: 'icon-chat',
        submenu: [
            { name: 'Chat', icon: 'icon-chat' },
            { name: 'Chat', icon: 'icon-chat' },
            { name: 'Chat', icon: 'icon-chat' },
        ],
    },
];
