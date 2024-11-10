import { useRebarClient } from '@Client/index.js';
import { NotificationTypes } from '../shared/types.js';
import { notifyConfig } from '../shared/config.js';
import { notificationEvents } from '../shared/events.js';

const Rebar = useRebarClient();
const webview = Rebar.webview.useWebview();

export function useNotificationClientAPI() {
    function show(message: string, type: NotificationTypes, time: number = notifyConfig.defaultTime, persistant: boolean = false) {
        webview.emit(notificationEvents.toWebview.show, message, type, time, persistant);
    }
    function clear(searchText: string) {
        webview.emit(notificationEvents.toWebview.clear, searchText);
    }
    return {
        show,
        clear,
    };
}
