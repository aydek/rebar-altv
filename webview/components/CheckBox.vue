<script setup lang="ts">
import { useAudio } from '../composables/useAudio';

interface Props {
    checked: boolean;
    type?: 'normal' | 'disabled';
}

const props = withDefaults(defineProps<Props>(), {
    checked: false,
    type: 'normal',
});

const emits = defineEmits<{
    onToggle: [checked: boolean];
}>();


const audio = useAudio();

const handleClick = (event: any) => {
    event.preventDefault();
    playMouseUp();
    emits('onToggle', event.target.checked);
};

async function playMouseUp() {
    if (props.type === 'disabled') return;
    audio.play('/sounds/select.ogg');
}
</script>

<template>
    <label class="me-5 inline-flex cursor-pointer items-center">
        <input type="checkbox" class="peer sr-only" @change="handleClick" :checked="props.checked" />
        <div
            class="peer relative h-6 w-11 rounded-full bg-red-800 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600"
        ></div>
    </label>
</template>
