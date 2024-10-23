import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { controlMenuEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';
import { getMenuItems } from './config.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();
const api = Rebar.useClientApi();
const messenger = Rebar.messenger.useMessenger();

export function parseItemsToWebview() {
    webview.emit(controlMenuEvents.toWebview.setItems, clone.arrayData(getMenuItems()));
}

export async function onClick(name: 'settings') {
    handleClose();

    switch (name) {
        case 'settings':
            const settingApi = await api.getAsync('settings-api');
            settingApi.open();

            break;

        default:
            break;
    }
}

export function handleClick(index: number) {
    const item = getMenuItems()[index];

    if (!item) return;

    item.callback();
}

export function handleOpen() {
    if (messenger.isChatFocused()) return;
    if (!alt.getMeta('control-menu-open')) {
        webview.show('ControlMenu', 'persistent');
        webview.focus();
        alt.toggleGameControls(false);
        alt.setMeta('control-menu-open', true);
    }
}

export function handleClose() {
    if (alt.getMeta('control-menu-open')) {
        webview.hide('ControlMenu');
        webview.unfocus();
        alt.toggleGameControls(true);
        alt.deleteMeta('control-menu-open');
    }
}
