<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

interface IProps {
    class?: string;
    icon: string;
    size?: number;
}

const props = withDefaults(defineProps<IProps>(), {
    class: '',
    icon: 'icon-error_outline',
    size: 1.8,
});
</script>

<template>
    <div :class="twMerge('flex h-full items-center justify-center', props.class)">
        <span :class="twMerge(props.icon, 'm-0 p-0 text-center ')" :style="{ fontSize: `${props.size}rem` }"></span>
    </div>
</template>
