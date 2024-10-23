import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { getSettings } from './settings.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();
let isOpen = false;

export function useSettingsAPI() {
    async function open() {
        if (!isOpen) {
            alt.toggleGameControls(false);
            webview.show('Settings', 'page', true);
            await alt.Utils.wait(50);
            getSettings();
        }
    }

    function close() {
        if (isOpen) {
            isOpen = false;
            alt.toggleGameControls(true);
        }
    }
    return {
        open,
        close,
    };
}

declare global {
    export interface ClientPlugin {
        ['setting-api']: ReturnType<typeof useSettingsAPI>;
    }
}

api.register('setting-api', useSettingsAPI());

webview.onClose('Settings', () => {
    useSettingsAPI().close();
});
