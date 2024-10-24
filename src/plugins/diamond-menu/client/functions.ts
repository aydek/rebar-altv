import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { DiamondMenuEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';
import './api.js';
import { getMenuItems } from './api.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();
const api = Rebar.useClientApi();
const messenger = Rebar.messenger.useMessenger();

export function parseItemsToWebview() {
    webview.emit(DiamondMenuEvents.toWebview.setItems, clone.arrayData(getMenuItems()));
}

export function handleClick(subIndex: number, index: number) {
    handleClose();
    let item = getMenuItems()[index];

    if (!item) return;

    if (subIndex > -1) item = getMenuItems()[index].submenu[subIndex];

    if (!item) return;

    item.onClick();
}

export function handleOpen() {
    if (messenger.isChatFocused()) return;
    if (!alt.getMeta('control-menu-open')) {
        webview.show('DiamondMenu', 'persistent');
        webview.focus();
        alt.toggleGameControls(false);
        alt.setMeta('control-menu-open', true);
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
