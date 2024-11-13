import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import './api.js';

const Rebar = useRebar();

function showNotificationWebview(player: alt.Player) {
    const webview = Rebar.player.useWebview(player);
    webview.show('Notifications', 'persistent');
}

alt.on('rebar:playerAccountBound', showNotificationWebview);