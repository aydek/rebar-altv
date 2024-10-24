<script setup lang="ts">
import Icon from '@Components/Icon.vue';
import { useAudio } from '@Composables/useAudio';
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

const props = defineProps<{
    size: number;
    text: string;
    icon: string;
}>();

const emit = defineEmits<{
    onClick: [];
}>();

const hovering = ref(false);

const audio = useAudio();

function handleClick() {
    audio.play('/sounds/select.ogg');
    emit('onClick');
}

function mouseEnter() {
    audio.play('/sounds/hover.ogg');
    hovering.value = true;
}

function mouseLeave() {
    hovering.value = false;
}
</script>

<template>
    <div type="icon" :class="twMerge(' grid aspect-square place-items-center')" :style="{ height: props.size + 'rem' }">
        <svg viewBox="-1 -1 100 100" width="100%" height="100%" class="rotate-45">
            <rect x="1" y="1" width="96" height="96" rx="5" fill="none" stroke="#171717" stroke-width="3" />
            <rect
                x="1"
                y="1"
                width="96"
                height="96"
                rx="5"
                stroke-width="1"
                class="stroke-accent-600 fill-accent-700/50 hover:fill-accent-500/50 cursor-pointer"
                @mouseenter="mouseEnter"
                @mouseleave="mouseLeave"
                @click="handleClick"
            />
        </svg>
        <div class="pointer-events-none absolute flex flex-col items-center gap-2 text-center" :style="{ width: props.size / 2.5 + 'rem' }">
            <Icon :class="twMerge('transition-all', hovering && 'scale-125')" :icon="props.icon" :size="props.size / 3" />
            <div :class="twMerge('text-base transition-all', hovering && 'font-bold')">{{ props.text }}</div>
        </div>
    </div>
</template>
<style scoped>
.pointer-disable {
    pointer-events: visibleFill;
}
</style>
