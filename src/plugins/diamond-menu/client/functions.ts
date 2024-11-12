import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { DiamondMenuEvents } from '../shared/events.js';
import './api.js';
import { getMenuItems } from './api.js';
import { IDiamondMenuItem } from '../shared/types.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();
const messenger = Rebar.messenger.useMessenger();

export async function parseItemsToWebview() {
    if (!alt.getMeta('control-menu-open')) {
        return;
    }
    const items = getMenuItems();

    const validItems = await filterItems(items, true);

    webview.emit(DiamondMenuEvents.toWebview.setItems, validItems);
}

// Recursive function to filter items while preserving the original structure
async function filterItems(menuItems: IDiamondMenuItem[], sanitize: boolean): Promise<IDiamondMenuItem[]> {
    const filteredItems: IDiamondMenuItem[] = [];

    for (const item of menuItems) {
        // Check the condition, if present
        if (item.condition) {
            const result = await item.condition();
            if (!result) continue; // Skip this item if the condition is false
        }

        // If there's a submenu, recursively filter it
        let filteredSubmenu = item.submenu ? await filterItems(item.submenu, sanitize) : undefined;

        // Create a new item without the functions `condition` and `onClick`
        const sanitizedItem: IDiamondMenuItem = {
            name: item.name,
            icon: item.icon,
            submenu: filteredSubmenu, // This keeps the submenu structure intact
        };

        // Add the sanitized item to the filteredItems array
        if (sanitize) filteredItems.push(sanitizedItem);
        else
            filteredItems.push({
                ...item,
                submenu: filteredSubmenu, // This keeps the submenu structure intact
            });
    }

    return filteredItems;
}

export async function handleClick(layers: number[], index: number) {
    const items = getMenuItems();

    let currentItems = await filterItems(items, false);

    // If theres 0 layers
    if (layers.length < 1) {
        const item = currentItems[index];
        if (!item || !item.onClick) {
            return;
        }

        if (!item.disableCloseOnClick) {
            handleClose();
        }

        item.onClick();
        return;
    }

    // if theres more layers

    for (const layer of layers) {
        if (!currentItems[layer]) break;
        if (!currentItems[layer].submenu) break;
        currentItems = currentItems[layer].submenu;
    }
    const item = currentItems[index];

    if (!item) return;

    if (!item.disableCloseOnClick) {
        handleClose();
    }

    item.onClick();
}

export function handleOpen() {
    if (messenger.isChatFocused()) return;
    if (!alt.getMeta('control-menu-open')) {
        webview.show('DiamondMenu', 'persistent');
        webview.focus();
        alt.toggleGameControls(false);
        alt.setMeta('control-menu-open', true);

        const res = alt.getScreenResolution();

        alt.setCursorPos({ x: res.x / 2, y: res.y / 2 });
    }
}

export function handleClose() {
    if (alt.getMeta('control-menu-open')) {
        webview.hide('DiamondMenu');
        webview.unfocus();
        alt.toggleGameControls(true);
        alt.deleteMeta('control-menu-open');
    }
}
