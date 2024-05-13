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
    <div :class="twMerge('flex items-center justify-center h-full translate-y-0.5', props.class)">
        <span :class="twMerge(props.icon, 'p-0 m-0 text-center ')" :style="{ fontSize: `${props.size}rem` }"></span>
    </div>
</template>
