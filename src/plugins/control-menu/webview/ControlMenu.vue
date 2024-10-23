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

const subMenuOpen = ref(-1);

const dummys: IMenuItem[] = [
    {
        name: 'Settings',
        icon: 'icon-settings',
        submenus: [{ name: 'sub Settings', icon: 'icon-settings' }, { name: 'sub Settings', icon: 'icon-settings' }, { name: 'sub Settings' }],
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
    if (items.value[index].submenus && items.value[index].submenus.length > 0) {
        subMenuOpen.value = index;
        return;
    }
    subMenuOpen.value = -1;
    events.emitClient(controlMenuEvents.toClient.onClick, index);
}

function handleSubClick(index: number, subIndex: number) {
    events.emitClient(controlMenuEvents.toClient.onSubClick, index, subIndex);
}

onMounted(() => {
    events.emitClient(controlMenuEvents.toClient.getItems);
    events.on(controlMenuEvents.toWebview.setItems, (data: IMenuItem[]) => (items.value = data));
});
</script>
<template>
    <div class="fixed inset-0 z-50" @click.self="subMenuOpen = -1">
        <div v-if="!altInWindow()">
            <Button type="primary" @click="handleToggle">Toggle</Button>
        </div>
        <div :class="twMerge('absolute bottom-5 flex w-screen items-center justify-center duration-500', items.length < 1 && 'translate-y-full opacity-0')">
            <div class="flex items-center rounded-xl bg-black bg-opacity-50">
                <div v-for="(item, index) of items" class="flex justify-center">
                    <Button type="icon" class="group m-3 flex aspect-auto flex-col items-center" @click="handleClick(index)">
                        <div v-if="subMenuOpen !== index" class="text-shadow absolute -top-8 opacity-0 transition-all group-hover:opacity-100">
                            {{ item.name }}
                        </div>

                        <Icon :icon="item.icon" :size="2" class="group-hover:scale-125"></Icon>
                    </Button>

                    <div v-if="subMenuOpen === index" class="absolute bottom-20 flex flex-col gap-4 rounded-xl bg-black bg-opacity-50 p-3">
                        <div v-for="(item, subIndex) of items[subMenuOpen].submenus">
                            <Button type="icon" class="flex aspect-auto items-center gap-2" @click="handleSubClick(index, subIndex)">
                                <Icon v-if="item.icon" :icon="item.icon" :size="2" class="" />
                                <div>{{ item.name }}</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
