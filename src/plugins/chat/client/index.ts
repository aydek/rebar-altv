import * as alt from 'alt-client';
import { useRebarClient } from '@Client/index.js';
import { chatConfig } from '../shared/config.js';
import { ChatEvents } from '../shared/events.js';
import './setting.js';

const Rebar = useRebarClient();
const messenger = Rebar.messenger.useMessenger();
const webview = Rebar.webview.useWebview();

function focusChat(prefix: string = '') {
    if (messenger.isChatFocused()) {
        return;
    }

    if (alt.isConsoleOpen()) {
        return;
    }

    messenger.focusChat();
    webview.focus();
    alt.toggleGameControls(false);
    webview.emit(ChatEvents.toWebview.focus, prefix);
    alt.emitServer(ChatEvents.toServer.isChatting, true);
}

function unfocusChat() {
    if (!messenger.isChatFocused()) {
        return;
    }

    messenger.unfocusChat();
    webview.unfocus();
    alt.toggleGameControls(true);
    webview.emit(ChatEvents.toWebview.unfocus);
    alt.emitServer(ChatEvents.toServer.isChatting, false);
}

alt.on('keyup', (key: number) => {
    if (!webview.isOverlayOpen('Chat')) {
        return;
    }

    if (webview.isAnyPageOpen()) {
        return;
    }

    if (alt.isConsoleOpen()) {
        return;
    }

    if (key === chatConfig.keybinds.open) {
        focusChat();
    }

    if (key === chatConfig.keybinds.close) {
        unfocusChat();
    }
    if (key === chatConfig.keybinds.openWithPrefix) {
        focusChat('/');
    }
});

webview.on(ChatEvents.toClient.unfocus, unfocusChat);
