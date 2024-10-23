import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { getSettings } from './settings.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

export function useSettingsAPI() {
    function open() {
        if (!alt.getMeta('settings-open')) {
            alt.toggleGameControls(false);
            webview.show('Settings', 'page', true);
            alt.setMeta('settings-open', true);
            getSettings();
        }
    }

    function close() {
        if (alt.getMeta('settings-open')) {
            alt.deleteMeta('settings-open');
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
        ['settings-api']: ReturnType<typeof useSettingsAPI>;
    }
}

api.register('settings-api', useSettingsAPI());

webview.onClose('Settings', () => {
    useSettingsAPI().close();
});
