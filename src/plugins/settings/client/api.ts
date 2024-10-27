import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { ISettingsItem } from '../shared/types.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

const allSettings: ISettingsItem[] = [];

export function useSettingsAPI() {
    function open() {
        if (!alt.getMeta('settings-open')) {
            alt.toggleGameControls(false);
            webview.show('Settings', 'page', true);
            alt.setMeta('settings-open', true);
        }
    }

    function close() {
        if (alt.getMeta('settings-open')) {
            alt.deleteMeta('settings-open');
            alt.toggleGameControls(true);
        }
    }

    function add(item: ISettingsItem) {
        allSettings.push(item);
    }

    function getAll() {
        return allSettings;
    }
    return { add, getAll, open, close };
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
