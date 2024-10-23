import { useRebarClient } from '@Client/index.js';
import { ISettings } from '../shared/types.js';
import { SettingsEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

export function getSettings() {
    const chatSettings = api.get('chat-api');

    const settings: ISettings[] = [
        {
            title: 'Chat',
            icon: 'icon-chat',
            options: [
                {
                    title: 'Timestamps',
                    type: 'boolean',
                    key: 'timestamps',
                    value: chatSettings.get().timestamps,
                },
                {
                    title: 'Automatically hide',
                    type: 'boolean',
                    key: 'autohide',
                    value: chatSettings.get().autohide,
                },
                {
                    title: 'Font size',
                    type: 'slider',
                    key: 'fontsize',
                    value: chatSettings.get().fontsize,
                    min: 0.7,
                    max: 2,
                },
            ],
        },
    ];

    webview.emit(SettingsEvents.toWebview.parse, clone.arrayData(settings));
}
