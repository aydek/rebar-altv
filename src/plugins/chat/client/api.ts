import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { ChatEvents } from '../shared/events.js';
import { ChatSettings } from '../shared/types.js';
import { chatConfig } from '../shared/config.js';

const API_NAME = 'chat-api';
const settingsKey = 'chat-settings';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

function useApi() {
    function setSettings(settings: ChatSettings) {
        const current: ChatSettings = alt.LocalStorage.get(settingsKey);
        if (!current) {
            return;
        }
        alt.LocalStorage.set(settingsKey, settings);
        alt.LocalStorage.save();
        webview.emit(ChatEvents.toWebview.setSettings, current);
    }

    function getSettings() {
        const current: ChatSettings = alt.LocalStorage.get(settingsKey);

        return current;
    }

    return {
        set: setSettings,
        get: getSettings,
    };
}

declare global {
    export interface ClientPlugin {
        [API_NAME]: ReturnType<typeof useApi>;
    }
}

Rebar.useClientApi().register(API_NAME, useApi());
