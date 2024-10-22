import { altInWindow } from '@Composables/altInWindow.js';
import { ref } from 'vue';
import { dummySuggestions } from './webview/utils/dummy.js';
import { chatConfig } from './shared/config.js';
import { ChatSettings } from './shared/types.js';

export type CommandInfo = { name: string; desc: string };

const suggestions = ref<CommandInfo[]>(altInWindow() ? [] : dummySuggestions);
const inputHistory = ref<string[]>([]);
const focus = ref<boolean>(false);
const settings = ref<ChatSettings>(chatConfig.chatSettings);

export function useStore() {
    function addChatHistory(message: string) {
        inputHistory.value.push(message);
        if (inputHistory.value.length > chatConfig.maxHistoryMessages) {
            inputHistory.value.pop();
        }
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
        },
    };
}
