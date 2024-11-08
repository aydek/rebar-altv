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
function getTypeEmoji(message: Message) {
    switch (message.type) {
        case 'info': {
            return '✅';
        }

        case 'warning': {
            return '❓';
        }

        case 'system': {
            return '🔔';
        }

        case 'alert': {
            return '❌';
        }
    }
    return '';
}
</script>
<template>
    <div
        :class="twMerge(' flex select-text items-center py-1  font-medium tracking-wider  ')"
        :style="{ fontSize: store.settings.value.fontsize + 'rem' }"
        v-for="message of messenger.messages.value"
    >
        <span v-if="store.settings.value.timestamps" :class="twMerge('mr-1 rounded-lg p-1 transition-all', !store.focus.value && 'bg-black bg-opacity-50')">{{
            convertTimestampToTime(message.timestamp)
        }}</span>
        <div :class="twMerge('flex w-full items-center')">
            <span v-if="message.author" class="text-shadow">🗨 {{ message.author }}:&nbsp;</span>
            <span v-html="colorify(useSanitizeInput(replaceEmoji(getTypeEmoji(message) + message.content)))" class="text-shadow"></span>
        </div>
    </div>
</template>
