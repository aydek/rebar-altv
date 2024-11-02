<script setup lang="ts">
import Icon from '@Components/Icon.vue';
import { usePlayerStats } from '@Composables/usePlayerStats';
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

const stats = usePlayerStats();

type IStatItem = {
    id: string;
    icon: string;
    color: string;
    value: any;
    min: number;
    max: number;
    active?: any;
    activeColor?: string;
};

const defaultStats = ref<IStatItem[]>([
    {
        id: 'stat-mic',
        icon: 'icon-microphone',
        color: '#ede100',
        value: 33,
        min: 0,
        max: 100,
        active: stats.isTalking,
        activeColor: '#ede100',
    },
    {
        id: 'stat-health',
        icon: 'icon-heart',
        color: '#cc0000',
        value: stats.health,
        min: 100,
        max: 200,
    },
    {
        id: 'stat-armour',
        icon: 'icon-shield2',
        color: '#0055ff',
        value: stats.armour,
        min: 0,
        max: 100,
    },
]);

function combined() {
    return [...defaultStats.value];
}

function calculateValue(item: IStatItem) {
    const range = item.max - item.min;
    const adjustedValue = item.value - item.min;
    return (adjustedValue / range) * 100;
}
</script>

<template>
    <div class="fixed bottom-1 left-3 flex w-full justify-start gap-6">
        <div v-for="item of defaultStats" class="flex flex-col items-center justify-center" :key="item.id" :style="{ color: item.active && item.activeColor }">
            <Icon :icon="item.icon" class="h-11 w-10 rounded-t-lg bg-black bg-opacity-50 transition-all" />
            <div class="relative h-2 w-[130%]">
                <div :style="{ background: item.color, filter: 'brightness(40%)' }" class="absolute left-0 top-0 h-full w-full rounded-lg"></div>
                <div
                    class="absolute left-0 top-0 h-full rounded-lg transition-all"
                    :style="{ background: item.color, width: `${calculateValue(item)}%` }"
                ></div>
            </div>
        </div>
    </div>
</template>
