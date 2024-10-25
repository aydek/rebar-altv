import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { handleClick, handleClose, handleOpen, parseItemsToWebview } from './functions.js';
import { DiamondMenuEvents } from '../shared/events.js';

const Rebar = useRebarClient();
const api = Rebar.useClientApi();
const webview = Rebar.webview.useWebview();

async function init() {
    const keybindApi = await api.getAsync('keybind-controller');

    keybindApi.add({
        key: 18, // alt
        identifier: 'control-menu-key',
        description: 'Open control menu',
        keyDown: handleOpen,
        keyUp: handleClose,
        allowInAnyMenu: false,
        allowIfDead: false,
    });

    webview.on(DiamondMenuEvents.toClient.getItems, parseItemsToWebview);
    webview.on(DiamondMenuEvents.toClient.onClick, handleClick);
}

alt.on('windowFocusChange', (isFocused: boolean) => {
    handleClose();
});

init();
