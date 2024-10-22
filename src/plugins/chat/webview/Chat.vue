<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Resizable from './components/Resizable.vue';
import { altInWindow } from '@Composables/altInWindow';
import { useMessenger } from '@Composables/useMessenger';
import Button from '@Components/Button.vue';
import { twMerge } from 'tailwind-merge';
import Messages from './components/Messages.vue';
import InputBox from './components/InputBox.vue';
import { CommandInfo, useStore } from '../store';
import { useEvents } from '@Composables/useEvents';
import { ChatEvents } from '../shared/events';

const autoScroll = ref(null);

const store = useStore();
const messenger = useMessenger();
const events = useEvents();
const prefix = ref('');

function getMixMax() {
    return {
        minWidth: window.screen.availWidth / 5,
        minHeight: window.screen.availHeight / 4,
        maxWidth: window.screen.availWidth / 1.5,
        maxHeight: window.screen.availHeight / 1.5,
    };
}

function handleEnd(props) {
    const { height, width } = props;
    autoScroll.value?.scrollIntoView({ block: 'end' });
}

messenger.onUpdate(() => {
    setTimeout(() => {
        autoScroll.value?.scrollIntoView({ block: 'end' });
    }, 50);
});

function setCommands(data: CommandInfo[]) {
    store.setSuggestions(data);
}

onMounted(() => {
    events.on(ChatEvents.toWebview.commands, setCommands);
    events.on(ChatEvents.toWebview.focus, (command: string) => {
        store.setFocus(true);
        prefix.value = command;
    });
    events.on(ChatEvents.toWebview.unfocus, () => store.setFocus(false));
});

function mockMessages() {
    messenger.mock({ content: 'This is alert message', type: 'alert', timestamp: Date.now() });
    messenger.mock({ content: 'This is system message', type: 'system', timestamp: Date.now() });
    messenger.mock({ content: 'This is info message', type: 'info', timestamp: Date.now() });
    messenger.mock({ content: 'This is warning message', type: 'warning', timestamp: Date.now() });
    messenger.mock({ content: 'This is custom message', type: 'custom', timestamp: Date.now() });
    messenger.mock({ content: 'This is player message', type: 'player', timestamp: Date.now(), author: 'Jonas_Valanciunas (2)' });
}
</script>
<template>
    <div v-if="!altInWindow()" class="absolute bottom-10 left-10 z-10 flex gap-4">
        <Button @click="mockMessages()">Add message</Button>
        <Button @click="store.setFocus(!store.focus.value)">Toggle focus</Button>
    </div>
    <Resizable
        :width="store.settings.value.width"
        :height="store.settings.value.height"
        :minWidth="getMixMax().minWidth"
        :minHeight="getMixMax().minHeight"
        :maxWidth="getMixMax().maxWidth"
        :maxHeight="getMixMax().maxHeight"
        :active="['rb']"
        @resize:end="handleEnd"
    >
        <div :class="twMerge('relative  m-2 h-full   w-full  rounded-lg transition-all', store.focus.value && 'bg-black bg-opacity-50')">
            <div :class="twMerge('absolute bottom-0 left-0 max-h-full w-full overflow-hidden p-1', store.focus.value && 'overflow-y-scroll ')">
                <Messages />
                <div ref="autoScroll" class="h-px"></div>
            </div>
            <InputBox v-if="store.focus.value" :prefix="prefix" />
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute bottom-0 right-0 h-10 w-10 fill-white" v-if="store.focus.value">
            <title>resize-bottom-right</title>
            <path d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
        </svg>
    </Resizable>
</template>
<style scoped></style>
