import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { handleClick, handleClose, handleOpen, handleSubClick, parseItemsToWebview } from './functions.js';
import { controlMenuEvents } from '../shared/events.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

async function init() {
    const keybindApi = await api.getAsync('keybind-controller');

    keybindApi.add({
        key: 113, // f2
        identifier: 'control-menu-key',
        description: 'Open control menu',
        keyDown: handleOpen,
        allowInAnyMenu: false,
        allowIfDead: false,
    });

    webview.on(controlMenuEvents.toClient.getItems, parseItemsToWebview);
    webview.on(controlMenuEvents.toClient.onClick, handleClick);
    webview.on(controlMenuEvents.toClient.onSubClick, handleSubClick);
}

alt.on('keyup', (key: alt.KeyCode) => {
    if (key === 113 && alt.getMeta('control-menu-open')) {
        handleClose();
    }
});

init();
