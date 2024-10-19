<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Icon from '@Components/Icon.vue';
import { twMerge } from 'tailwind-merge';
import { useEvents } from '@Composables/useEvents';
import { InstructionKeysEvents } from '../shared/events';
import { IKeys } from '../shared/interface';

const devData: IKeys[] = [
    {
        key: 'icon-long-arrow-down',
        text: '',
    },
    {
        key: 'icon-long-arrow-up',
        text: 'Move forward',
    },

    {
        key: 's',
        text: 'Move backward',
    },
    {
        key: 'a',
        text: 'Move left',
    },
];

const events = useEvents();

const keys = ref<IKeys[]>('alt' in window ? [] : devData);

function handleSet(data: IKeys[]) {
    keys.value = data;
}

onMounted(() => {
    events.on(InstructionKeysEvents.toWebview.set, handleSet);
});
</script>

<template>
    <div
        class="absolute bottom-2 right-2 z-30 flex items-center rounded bg-neutral-900 p-2 text-xl"
        v-if="keys.length > 0"
    >
        <template v-for="(item, index) in keys" :id="index + item.key">
            <div :class="twMerge('mx-3 flex items-center gap-2', item.text.length < 1 && 'mx-0 gap-0')">
                <div class="flex aspect-square w-8 items-center justify-center rounded bg-neutral-500 font-bold">
                    <Icon v-if="item.key.includes('icon')" :icon="item.key" :size="1.4" class="translate-y-0" />
                    <div v-if="!item.key.includes('icon')">{{ item.key.toUpperCase() }}</div>
                </div>

                <div>{{ item.text }}</div>
            </div>
        </template>
    </div>
</template>
