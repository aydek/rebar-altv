<script setup lang="ts">
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import { altInWindow } from '@Composables/altInWindow';
import { useEvents } from '@Composables/useEvents';
import { twMerge } from 'tailwind-merge';
import { onMounted, ref } from 'vue';
import { controlMenuEvents } from '../shared/events';
import { IMenuItem } from '../shared/types';

const events = useEvents();

const dummys = [
    {
        name: 'Settings',
        icon: 'icon-settings',
    },
    {
        name: 'Scoreboard',
        icon: 'icon-score',
    },
];

const items = ref<IMenuItem[]>(altInWindow() ? [] : dummys);

function handleToggle() {
    if (items.value.length > 0) items.value = [];
    else items.value = dummys;
}

function handleClick(index: number) {
    events.emitClient(controlMenuEvents.toClient.onClick, index);
}

onMounted(() => {
    events.emitClient(controlMenuEvents.toClient.getItems);
    events.on(controlMenuEvents.toWebview.setItems, (data: IMenuItem[]) => (items.value = data));
});
</script>
<template>
    <div v-if="!altInWindow()">
        <Button type="primary" @click="handleToggle">Toggle</Button>
    </div>
    <div :class="twMerge('absolute bottom-5 flex w-screen items-center justify-center duration-500', items.length < 1 && 'translate-y-full opacity-0')">
        <div class="flex items-center rounded-xl bg-black bg-opacity-50">
            <div v-for="(item, index) of items" class="group">
                <Button type="icon" class="m-3 flex aspect-auto flex-col items-center" @click="handleClick(index)">
                    <div class="absolute -top-8 opacity-0 transition-all group-hover:opacity-100">
                        {{ item.name }}
                    </div>

                    <Icon :icon="item.icon" :size="2" class="group-hover:scale-125"></Icon>
                </Button>
            </div>
        </div>
    </div>
</template>
