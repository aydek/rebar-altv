import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { IMenuItem } from '../shared/types.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

let menuItems: IMenuItem[] = [];

export function getMenuItems() {
    return menuItems;
}

export function useControlMenuAPI() {
    function add(item: IMenuItem) {
        menuItems.push(item);
    }

    return {
        add,
    };
}

declare global {
    export interface ClientPlugin {
        ['control-menu-api']: ReturnType<typeof useControlMenuAPI>;
    }
}

api.register('control-menu-api', useControlMenuAPI());
