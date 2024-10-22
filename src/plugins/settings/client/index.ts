import * as alt from 'alt-client';
import * as native from 'natives';
import { useRebarClient } from '@Client/index.js';
import { ISettings } from '../shared/types.js';
import { SettingsEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';
import { isNativeMenuOpen } from '@Client/menus/native/page.js';
import { isWorldMenuOpen } from '@Client/menus/world/index.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();
const messenger = Rebar.messenger.useMessenger();
let isOpen = false;

function getSettings() {
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

function handleSettings(type: string, key: string, value: any) {
    switch (type) {
        case 'chat':
            const chatSettings = api.get('chat-api');
            let current = chatSettings.get();
            current[key] = value;
            chatSettings.set(current);
            break;

        default:
            break;
    }
}

webview.on(SettingsEvents.toClient.setSetting, handleSettings);

alt.on('keyup', async (key: number) => {
    if (webview.isAnyPageOpen()) {
        return;
    }

    if (messenger.isChatFocused()) {
        return;
    }

    if (isWorldMenuOpen()) {
        return;
    }

    if (isNativeMenuOpen()) {
        return;
    }

    if (alt.isConsoleOpen()) {
        return;
    }

    if (key === 118) {
        //f7
        if (!isOpen) {
            alt.toggleGameControls(false);
            webview.show('Settings', 'page', true);
            await alt.Utils.wait(50);
            getSettings();
        } else {
            webview.hide('Settings');
        }
    }
});

webview.onClose('Settings', () => {
    isOpen = false;
    alt.toggleGameControls(true);
});
