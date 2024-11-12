import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { handleClick, handleClose, handleOpen, parseItemsToWebview } from './functions.js';
import { DiamondMenuEvents } from '../shared/events.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

function runChecks() {
    if (webview.isAnyPageOpen()) {
        return false;
    }

    if (!alt.gameControlsEnabled()) {
        return false;
    }

    if (alt.getMeta('isEnteringORLeavingVehicle')) {
        return false;
    }

    return true;
}

alt.on('keydown', (key: alt.KeyCode) => {
    if (!runChecks()) return;
    if (key === alt.KeyCode.Alt) {
        handleOpen();
    }
});

alt.on('keyup', (key: alt.KeyCode) => {
    if (key === alt.KeyCode.Alt) {
        handleClose();
    }
});

alt.on('windowFocusChange', (isFocused: boolean) => {
    handleClose();
});

webview.on(DiamondMenuEvents.toClient.getItems, parseItemsToWebview);
webview.on(DiamondMenuEvents.toClient.onClick, handleClick);
alt.on('startLeavingVehicle', () => {
    alt.setMeta('isEnteringORLeavingVehicle', true);
});
alt.on('leftVehicle', () => {
    alt.setMeta('isEnteringORLeavingVehicle', false);
    handleClose();
});

alt.on('startEnteringVehicle', () => {
    alt.setMeta('isEnteringORLeavingVehicle', true);
});

alt.on('enteredVehicle', () => {
    alt.setMeta('isEnteringORLeavingVehicle', false);
    handleClose();
});
