import { useRebarClient } from '@Client/index.js';
import { IDiamondMenuItem } from '../shared/types.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();

let menuItems: IDiamondMenuItem[] = [];

export function getMenuItems() {
    return menuItems;
}

export function useControlMenuAPI() {
    function add(item: IDiamondMenuItem) {
        menuItems.push(item);
    }

    return {
        add,
    };
}

declare global {
    export interface ClientPlugin {
        ['diamond-menu-api']: ReturnType<typeof useControlMenuAPI>;
    }
}

api.register('diamond-menu-api', useControlMenuAPI());
