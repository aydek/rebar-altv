import * as alt from 'alt-server';
import { NotificationTypes } from '../shared/types.js';
import { notifyConfig } from '../shared/config.js';
import { notificationEvents } from '../shared/events.js';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

export function useNotificationAPI() {
    function show(player: alt.Player, message: string, type: NotificationTypes, time: number = notifyConfig.defaultTime, persistant: boolean = false) {
        const webview = Rebar.player.useWebview(player);
        webview.emit(notificationEvents.toWebview.show, message, type, time, persistant);
    }
    function clear(player: alt.Player, searchText: string) {
        const webview = Rebar.player.useWebview(player);
        webview.emit(notificationEvents.toWebview.clear, searchText);
    }
    return {
        show,
        clear,
    };
}
