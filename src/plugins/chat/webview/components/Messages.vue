<script setup lang="ts">
import { useMessenger } from '@Composables/useMessenger';
import { replaceEmoji } from '../utils/emoji';
import useSanitizeInput from '../utils/sanitize';
import { twMerge } from 'tailwind-merge';
import { Message } from '@Shared/types';
import Icon from '@Components/Icon.vue';
import { useStore } from '@Plugins/chat/store';

const messenger = useMessenger();
const store = useStore();

function colorify(text: string | null) {
    let matches = [];
    let m = null;
    let curPos = 0;
    if (!text) {
        return null;
    }
    do {
        m = /\{[A-Fa-f0-9]{3}\}|\{[A-Fa-f0-9]{6}\}/g.exec(text.substring(curPos));
        if (!m) {
            break;
        }
        matches.push({
            found: m[0],
            index: m['index'] + curPos,
        });
        curPos = curPos + m['index'] + m[0].length;
    } while (m != null);

    if (matches.length > 0) {
        text += '</font>';
        for (let i = matches.length - 1; i >= 0; --i) {
            let color = matches[i].found.substring(1, matches[i].found.length - 1);
            let insertHtml = `${i !== 0 ? '</font>' : ''}<font color="#${color}">`;
            text = `${text.slice(0, matches[i].index)}${insertHtml}${text.slice(matches[i].index + matches[i].found.length, text.length)}`;
        }
    }
    return text;
}

function convertTimestampToTime(timestamp: number): string {
    const date = new Date(timestamp); // Multiply by 1000 to convert to milliseconds
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
// type: "info" | "player" | "system" | "alert" | "warning" | "custom"
function getMessageStyling(message: Message) {
    let classes = '';
    let icon = '';
    switch (message.type) {
        case 'info': {
            classes = 'bg-blue-500 p-2 bg-opacity-40 rounded-lg';
            icon = 'icon-info3';
            break;
        }

        case 'warning': {
            classes = 'bg-amber-500 p-2 bg-opacity-40 rounded-lg';
            icon = 'icon-warning3';
            break;
        }

        case 'system': {
            classes = 'bg-gray-500 p-2 bg-opacity-40 rounded-lg';
            icon = 'icon-bell';
            break;
        }

        case 'alert': {
            classes = 'bg-red-500 p-2 bg-opacity-40 rounded-lg';
            icon = 'icon-error_outline';
            break;
        }
    }

    return { classes, icon };
}
</script>
<template>
    <div :class="twMerge('text-shadow flex select-text items-center py-1 font-semibold tracking-wide  ')" v-for="message of messenger.messages.value">
        <span v-if="store.settings.value.timestamps" :class="twMerge('mr-1 rounded-lg p-1 transition-all', !store.focus.value && 'bg-black bg-opacity-50')">{{
            convertTimestampToTime(message.timestamp)
        }}</span>
        <div :class="twMerge('flex w-full items-center', getMessageStyling(message).classes)">
            <Icon :icon="getMessageStyling(message).icon" v-if="getMessageStyling(message).icon.length > 0" :size="2" class="mr-2"></Icon>
            <span v-if="message.author" class="text-xl">{{ message.author }}: </span>
            <span v-html="colorify(useSanitizeInput(replaceEmoji(message.content)))"></span>
        </div>
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow:
        #000 0px 0px 1px,
        #000 0px 0px 1px,
        #000 0px 0px 1px,
        #000 0px 0px 1px,
        #000 0px 0px 1px,
        #000 0px 0px 1px;
}
</style>
