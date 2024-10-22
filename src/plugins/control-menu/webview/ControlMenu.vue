<script setup lang="ts">
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import { altInWindow } from '@Composables/altInWindow';
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

const open = ref(!altInWindow());

const items = [
    {
        name: 'Settings',
        icon: 'icon-settings',
    },
    {
        name: 'Scoreboard',
        icon: 'icon-score',
    },
];
</script>
<template>
    <div v-if="!altInWindow()">
        <Button type="primary" @click="open = !open">Toggle</Button>
    </div>
    <div :class="twMerge('absolute bottom-0 flex h-48 w-screen items-center justify-center gap-5 transition-all', !open && 'opacity-0')">
        <div v-for="item of items" class="group">
            <Button type="icon" class="flex flex-col">
                <Icon :icon="item.icon" :size="3"></Icon>
            </Button>
            <div :class="'h-0 opacity-0 transition-all group-hover:h-1 group-hover:opacity-100'">{{ item.name }}</div>
        </div>
    </div>
</template>
