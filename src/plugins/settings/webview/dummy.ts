import { ISettings } from '../shared/types.js';

export const dummyData: ISettings[] = [
    {
        title: 'Chat',
        icon: 'icon-chat',
        options: [
            {
                title: 'Timestamps',
                type: 'boolean',
                value: false,
                key: 'timestamps',
            },
            {
                title: 'Automatically hide',
                type: 'boolean',
                value: true,
                key: 'autohide',
            },
            {
                title: 'Font size',
                type: 'slider',
                key: 'fontsize',
                value: 1.5,
                min: 1,
                max: 3,
            },
        ],
    },
];
