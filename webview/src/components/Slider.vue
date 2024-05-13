<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { ref, watch } from 'vue';
import { playSound } from '../utility/sound.js';

interface IProps {
    class?: string;
    min?: number;
    max?: number;
    step?: number;
    value: number;
}

const props = withDefaults(defineProps<IProps>(), {
    class: '',
    min: 0,
    max: 100,
    step: 1,
    value: 0,
});

const emit = defineEmits<{
    onChange: [value: number];
}>();

const rangeValue = ref(props.value);

watch(rangeValue, (value) => {
    emit('onChange', Number(value));
});

watch(
    () => props.value,
    (value) => {
        rangeValue.value = value;
    },
);
</script>

<template>
    <div class="w-full px-2 flex justify-between items-center">
        <input
            :class="twMerge('appearance-none h-1 w-full bg-neutral-500 outline-none', props.class)"
            :tabindex="-1"
            @click="() => playSound('select')"
            @mouseenter="() => playSound('hover')"
            type="range"
            v-model="rangeValue"
            :min="props.min"
            :max="props.max"
            :step="props.step"
        />
    </div>
</template>

<style scoped>
::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid #438e96;
    background: #325158;
    cursor: pointer;
}
</style>
