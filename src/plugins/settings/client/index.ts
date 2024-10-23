import { useRebarClient } from '@Client/index.js';
import { SettingsEvents } from '../shared/events.js';
import './api.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

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
