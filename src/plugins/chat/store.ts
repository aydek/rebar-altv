import { altInWindow } from '@Composables/altInWindow.js';
import { ref } from 'vue';
import { dummySuggestions } from './webview/utils/dummy.js';
import { chatConfig } from './shared/config.js';
import { ChatSettings } from './shared/types.js';
import { useEvents } from '@Composables/useEvents.js';
import { ChatEvents } from './shared/events.js';

export type CommandInfo = { name: string; desc: string };

const events = useEvents();

const suggestions = ref<CommandInfo[]>(altInWindow() ? [] : dummySuggestions);
const inputHistory = ref<string[]>([]);
const focus = ref<boolean>(false);
const settings = ref<ChatSettings>({
    width: window.screen.availWidth / 3,
    height: window.screen.availHeight / 2.5,
    timestamps: !('alt' in window),
    autohide: altInWindow(),
    fontsize: 1.2,
});
const hidden = ref({ state: false, time: Date.now() + 7000 });

export function useStore() {
    function addChatHistory(message: string) {
        inputHistory.value.push(message);
        if (inputHistory.value.length > chatConfig.maxHistoryMessages) {
            inputHistory.value.pop();
        }
    }

    function resetHide() {
        hidden.value = {
            state: false,
            time: Date.now() + 7000,
        };
    }
    return {
        suggestions,
        setSuggestions: (data: CommandInfo[]) => {
            suggestions.value = data;
        },
        inputHistory,
        addHistory: addChatHistory,
        focus,
        setFocus: (value: boolean) => {
            focus.value = value;
        },
        settings,
        setSettings: (val: ChatSettings) => {
            settings.value = val;
            events.emitClient(ChatEvents.toClient.setSettings, settings.value);
        },
        resetHide,
        hidden,
    };
}

events.on(ChatEvents.toWebview.setSettings, (data: ChatSettings) => useStore().setSettings(data));
