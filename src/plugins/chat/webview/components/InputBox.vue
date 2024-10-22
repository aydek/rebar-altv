<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { replaceEmoji } from '../utils/emoji';
import { useStore } from '@Plugins/chat/store';
import EmojiBox from './Emoji.vue';
import Suggestions from './Suggesions.vue';
import Icon from '@Components/Icon.vue';
import { chatConfig } from '@Plugins/chat/shared/config';
import { useMessenger } from '@Composables/useMessenger';
import { useEvents } from '@Composables/useEvents';
import { ChatEvents } from '@Plugins/chat/shared/events';

const inputText = ref('');
const inputRef = ref(null);
const emojisOpen = ref(false);
const activeSuggestions = ref([]);
const historyIndex = ref(0);

const store = useStore();
const messenger = useMessenger();
const events = useEvents();

function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.value.length > chatConfig.maxInputSize) {
        target.value = target.value.slice(0, chatConfig.maxInputSize);
        inputText.value = target.value;
    }
    if (inputText.value.includes(':')) {
        inputText.value = replaceEmoji(inputText.value);
    }

    activeSuggestions.value = [];

    if (inputText.value[0] === '/') {
        for (const suggestion of store.suggestions.value) {
            if (activeSuggestions.value.length > 3) continue;
            const gapIndex = inputText.value.indexOf(' ');
            if (
                suggestion.name.includes(inputText.value.slice(1, inputText.value.length)) ||
                (gapIndex > -1 && suggestion.name.includes(inputText.value.slice(1, gapIndex)))
            ) {
                activeSuggestions.value.push(suggestion);
            }
        }
    }
}

async function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();

        if (store.inputHistory.value.length < 1) {
            return;
        }
        activeSuggestions.value = [];

        let index = historyIndex.value;
        index -= 1;
        if (index < 0) {
            index = store.inputHistory.value.length - 1;
        }
        historyIndex.value = index;
        inputText.value = store.inputHistory.value[index];
    }

    if (event.key === 'Enter') {
        if (inputText.value.length < 1) {
            store.setFocus(false);
            return;
        }

        if ('alt' in window) {
            messenger.emit(inputText.value);
        } else {
            messenger.mock({ content: inputText.value, author: 'Aydek', type: 'player' });
        }

        events.emitClient(ChatEvents.toWebview.unfocus);

        store.addHistory(inputText.value);

        historyIndex.value = 0;
        inputText.value = '';
        activeSuggestions.value = [];
    }
}

function handleEmoji(emoji: string) {
    inputText.value = inputText.value.concat(emoji);
    inputRef.value.focus();
}

function handleInserCommand(command: string) {
    inputText.value = command;
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    inputRef.value.focus();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div class="absolute left-0 top-[101%] flex h-12 w-full rounded bg-black bg-opacity-60 font-bold">
        <Icon
            class="mx-2 grid h-full cursor-pointer place-items-center hover:opacity-75"
            :size="1.8"
            icon="icon-emoji_emotions"
            @click="() => (emojisOpen = !emojisOpen)"
        />
        <EmojiBox v-if="emojisOpen" @closeContainer="() => (emojisOpen = false)" @addEmoji="handleEmoji" />
        <input
            v-model="inputText"
            :placeholder="'Type your message'"
            type="text"
            name="textbox"
            @input="handleInput"
            ref="inputRef"
            autocomplete="off"
            class="h-full w-full bg-transparent text-lg"
        />
        <div class="top-0 mx-2 flex h-full items-center gap-2 whitespace-nowrap">
            <div>{{ inputText.length }} / {{ chatConfig.maxInputSize }}</div>
            <Icon :size="1.4" icon="icon-pencil2"></Icon>
        </div>

        <Suggestions v-if="activeSuggestions.length > 0" :suggestions="activeSuggestions" @insertCommand="handleInserCommand" />
    </div>
</template>
