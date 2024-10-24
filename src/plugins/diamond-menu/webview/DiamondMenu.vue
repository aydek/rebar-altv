<script setup lang="ts">
import { onMounted, ref, StyleValue } from 'vue';
import Item from './components/Item.vue';
import { getCordinates } from './functions';
import { IDiamondMenuItem } from '../shared/types';
import { altInWindow } from '@Composables/altInWindow';
import { useEvents } from '@Composables/useEvents';
import { DiamondMenuEvents } from '../shared/events';
import { twMerge } from 'tailwind-merge';

const events = useEvents();

const items = ref<IDiamondMenuItem[]>(
    altInWindow()
        ? []
        : [
              { name: 'Settings', icon: 'icon-settings' },
              { name: 'Admin', icon: 'icon-admin_panel_settings' },
              { name: 'Chat', icon: 'icon-chat' },
          ],
);

const size = ref(6);
const submenu = ref(-1);

function getPosition(index: number): StyleValue {
    const { x, y } = getCordinates(index, size.value / 1.4 + 0.2);
    return {
        transform: `translate(${x}rem, ${y}rem)`,
    };
}

function handleClick(sub: number, index: number) {
    if (submenu.value < 0) {
        if (!items.value[index].submenu) {
            events.emitClient(DiamondMenuEvents.toClient.onClick, sub, index);
            return;
        }
        submenu.value = index;
        return;
    }

    submenu.value = -1;
    events.emitClient(DiamondMenuEvents.toClient.onClick, sub, index);
}

onMounted(() => {
    events.emitClient(DiamondMenuEvents.toClient.getItems);
    events.on(DiamondMenuEvents.toWebview.setItems, (data: IDiamondMenuItem[]) => (items.value = data));
});
</script>

<template>
    <div class="absolute grid h-screen w-screen place-items-center">
        <div :class="twMerge('grid aspect-square w-20 grid-cols-5 place-items-center  transition-all', items.length === 0 && 'translate-y-10 opacity-0')">
            <div v-if="submenu < 0" v-for="(item, index) of items" class="absolute" :style="getPosition(index)">
                <Item :icon="item.icon" :size="size" :text="item.name" v-on:on-click="handleClick(-1, index)" />
            </div>
            <div v-if="submenu > -1" v-for="(item, index) of items[submenu].submenu" class="absolute" :style="getPosition(index)">
                <Item :icon="item.icon" :size="size" :text="item.name" v-on:on-click="handleClick(submenu, index)" />
            </div>
        </div>
    </div>
</template>
