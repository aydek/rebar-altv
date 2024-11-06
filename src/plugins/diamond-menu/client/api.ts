import { IDiamondMenuItem } from '../shared/types.js';

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
