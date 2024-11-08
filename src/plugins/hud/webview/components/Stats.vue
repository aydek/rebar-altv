<script setup lang="ts">
import Icon from '@Components/Icon.vue';
import { altInWindow } from '@Composables/altInWindow';
import { useEvents } from '@Composables/useEvents';
import { HudEvents } from '@Plugins/hud/shared/events';
import { ISanitizedStatsItem } from '@Plugins/hud/shared/types';
import { twMerge } from 'tailwind-merge';
import { onMounted, ref } from 'vue';
import { dummyStats } from '../dunnyStats';
import Button from '@Components/Button.vue';

const events = useEvents();

const stats = ref<ISanitizedStatsItem[]>(altInWindow() ? [] : dummyStats);

function handleUpdate(data: Array<{ id: string; value: number; hidden: boolean; active: boolean }>) {
    stats.value.forEach((item) => {
        const dataItem = data.find((i) => i.id === item.id);
        if (!dataItem) return;
        item.value = dataItem.value;
        item.hidden = dataItem.hidden;
        item.active = dataItem.active;
    });
}

onMounted(async () => {
    events.on(HudEvents.toWebview.setStats, handleUpdate);
    const data = await events.emitClientRpc(HudEvents.toClient.getStatsRPC);
    if (data) stats.value = data;
});

function calculateValue(item: ISanitizedStatsItem) {
    const range = item.max - item.min;
    const adjustedValue = item.value - item.min;
    return 384 - (adjustedValue / range) * 384;
}

function toggleHidden() {
    stats.value[1].hidden = !stats.value[1].hidden;
    // stats.value[1].value = stats.value[1].value + 20;
    // if (stats.value[1].value > 200) {
    //     stats.value[1].value = 100;
    // }
}
</script>

<template>
    <Button class="absolute left-2 top-2" v-if="!altInWindow()" @click="toggleHidden"> Toggle </Button>

    <div class="fixed bottom-3 left-0 flex w-full justify-start">
        <div
            v-for="item of stats"
            :class="twMerge('mx-2 flex flex-col items-center justify-center transition-all duration-500', item.hidden && '-mx-5 translate-y-[200%]')"
            :key="item.id"
            :style="{ color: item.active ? item.activeColor : 'white' }"
        >
            <Icon :icon="item.icon" class="absolute z-10" :size="1.3" :class="twMerge(item.active && 'animate-pulse')" />

            <div class="aspect-square w-10">
                <svg viewBox="-1 -1 100 100" width="100%" height="100%" class="rotate-45">
                    <rect
                        x="1"
                        y="1"
                        width="96"
                        height="96"
                        rx="20"
                        :stroke="item.color"
                        stroke-width="10"
                        fill="#000000AA"
                        :style="{ filter: 'brightness(40%)' }"
                    />
                    <rect
                        x="1"
                        y="1"
                        width="96"
                        height="96"
                        rx="20"
                        :stroke="item.color"
                        class="transition-all"
                        stroke-width="10"
                        fill="none"
                        stroke-dasharray="384"
                        :stroke-dashoffset="calculateValue(item)"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>
