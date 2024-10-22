import { ref } from 'vue';
import { useEvents } from './useEvents.js';
import { Events } from '../../src/main/shared/events/index.js';
import { Message } from '../../src/main/shared/types/message.js';
import { altInWindow } from './altInWindow.js';

const MAXIMUM_MESSAGES = 256;
const messages = ref<Message[]>(altInWindow() ? [] : [{ type: 'info', content: 'Rebar Started', timestamp: Date.now() }]);
const events = useEvents();
let isInit = false;

type UpdateCallback = () => void;

let onUpdateCallbacks: UpdateCallback[] = [];

function processMessage(message: Message) {
    if (!message.timestamp) {
        message.timestamp = Date.now();
    }

    messages.value.push(message);

    if (messages.value.length >= MAXIMUM_MESSAGES) {
        messages.value.pop();
    }
    invokeUpdate();
}

function invokeUpdate() {
    for (let cb of onUpdateCallbacks) {
        cb();
    }
}

export function useMessenger() {
    if (!isInit) {
        isInit = true;
        events.on(Events.systems.messenger.send, processMessage);
    }

    /**
     * Allows you to directly emit a user message to the server to be handled by the message system.
     *
     * This function is used for making chat systems.
     *
     * @param {string} msg
     */
    function emit(msg: string) {
        if (!('alt' in window)) {
            console.log(`[Webview] Mock Event Message: ${msg}`);
            return;
        }

        alt.emit(Events.view.emitServer, Events.systems.messenger.process, msg);
    }

    function mock(message: Message) {
        processMessage(message);
    }

    function onUpdate(callback: UpdateCallback) {
        onUpdateCallbacks.push(callback);
    }

    return {
        emit,
        messages,
        mock,
        onUpdate,
    };
}
