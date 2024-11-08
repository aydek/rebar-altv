<script setup lang="ts">
import { onMounted, ref, StyleValue, toRaw } from 'vue';
import RecursiveItem from './components/RecursiveItem.vue';
import { getCordinates } from './functions';
import { IDiamondMenuItem } from '../shared/types';
import { altInWindow } from '@Composables/altInWindow';
import { useEvents } from '@Composables/useEvents';
import { DiamondMenuEvents } from '../shared/events';
import { twMerge } from 'tailwind-merge';
import { dummyItems } from './data';

import '../translate/index';
import { useTranslate } from '@Shared/translate';

const events = useEvents();
const { t } = useTranslate();

const items = ref<IDiamondMenuItem[]>(altInWindow() ? [] : dummyItems);

const size = ref(6);
const layers = ref([]);

function getPosition(index: number): StyleValue {
    const { x, y } = getCordinates(index, size.value / 1.4 + 0.2);
    return {
        transform: `translate(${x}rem, ${y}rem)`,
    };
}

function handleClick(index: number, item: IDiamondMenuItem) {
    if (layers.value.length > 0 && index === 0) {
        layers.value.pop();

        return;
    }
    //Subtract 1 if theres a back button
    let subtractIndex = layers.value.length > 0 ? 1 : 0;

    if (item.submenu) {
        layers.value.push(index - subtractIndex);
        // events.emitClient(DiamondMenuEvents.toClient.onClick, sub, index);
        return;
    }
    events.emitClient(DiamondMenuEvents.toClient.onClick, toRaw(layers.value), index - subtractIndex);
}

function getCurrentItems() {
    let currentItem = items.value;

    if (layers.value.length < 1) return currentItem;

    for (const layer of layers.value) {
        currentItem = currentItem[layer].submenu;
    }

    const currentItemWithBack = [...currentItem];

    // Only add the "Back" item if there are layers to go back
    if (layers.value.length > 0) {
        currentItemWithBack.unshift({ name: t('diamondmenu:back'), icon: 'icon-back' });
    }

    return currentItemWithBack;
}

onMounted(() => {
    events.emitClient(DiamondMenuEvents.toClient.getItems);
    events.on(DiamondMenuEvents.toWebview.setItems, (data: IDiamondMenuItem[]) => (items.value = data));
});
</script>

<template>
    <div class="absolute grid h-screen w-screen place-items-center">
        <div
            :class="
                twMerge('grid aspect-square w-20 grid-cols-5 place-items-center transition-all duration-500', items.length === 0 && 'translate-y-10 opacity-0')
            "
        >
            <div v-for="(item, index) of getCurrentItems()" class="absolute" :style="getPosition(index)">
                <RecursiveItem :icon="item.icon" :size="size" :text="item.name" v-on:on-click="handleClick(index, item)" />
            </div>
        </div>
    </div>
</template>
