import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { ISettings } from '../shared/types.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

const settings: ISettings[] = [];

export function useSettingsAPI() {
    function add(item: ISettings) {
        settings.push(item);
    }

    function get() {
        return settings;
    }
    
    return {
        add,
        get,
    };
}

declare global {
    export interface ClientPlugin {
        ['settings-api']: ReturnType<typeof useSettingsAPI>;
    }
}

api.register('settings-api', useSettingsAPI());
