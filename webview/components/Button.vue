<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useAudio } from '../composables/useAudio';

interface IProps {
    class?: string;
    type?: 'primary' | 'secondary' | 'icon' | 'disabled';
}
const props = withDefaults(defineProps<IProps>(), {
    class: '',
    type: 'primary',
});

const audio = useAudio();
</script>

<template>
    <div
        @click="() => audio.play('/sounds/select.ogg')"
        @mouseenter="() => audio.play('/sounds/hover.ogg')"
        :class="
            twMerge(
                'font-family cursor-pointer rounded-md border p-2 text-center text-lg font-semibold text-white transition ',
                props.type === 'primary' && 'border-accent-500 bg-accent-800 hover:bg-accent-600',
                props.type === 'secondary' && 'border-neutral-600 bg-neutral-900 hover:bg-neutral-700',
                props.type === 'icon' &&
                    ' flex aspect-square items-center justify-center rounded-full border-none p-0 hover:text-neutral-400',
                props.type === 'disabled' &&
                    'pointer-events-none cursor-auto border-neutral-600 bg-neutral-900 text-neutral-600',
                props.class,
            )
        "
    >
        <slot />
    </div>
</template>
