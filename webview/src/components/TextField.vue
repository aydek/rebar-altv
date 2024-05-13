<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { ref } from 'vue';

interface IProps {
    class?: string;
    label: string;
    error?: boolean;
    helperText?: string;
    type?: string;
    autoFocus?: boolean;
}

const focus = ref(false);
const text = ref('');

const emits = defineEmits(['onChange']);

const props = withDefaults(defineProps<IProps>(), {
    class: '',
    label: '',
    error: false,
    helperText: '',
    type: 'text',
    autoFocus: false,
});

function handleChange(value: string) {
    emits('onChange', value);
}

const handleInputFocus = () => {
    focus.value = true;
};

const handleInputBlur = () => {
    focus.value = false;
};
</script>

<template>
    <div :class="twMerge('w-auto relative my-7 select-none text-lg', props.class)">
        <div
            :class="
                twMerge(
                    'absolute top-0 pointer-events-none text-base ',
                    focus && 'text-accent-600',
                    (focus || text.length > 0 || typeof text === 'number') && ' -translate-y-full transition-all',
                )
            "
        >
            {{ props.label }}
        </div>

        <input
            :name="props.label"
            class="bg-transparent w-full border-b border-white focus:border-accent-600 focus:outline-none"
            :type="props.type ? props.type : 'text'"
            v-model="text"
            @keyup="handleChange(text)"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
            :autoFocus="props.autoFocus"
        />

        <div v-if="props.error && props.helperText" class="absolute font-semibold mt-1 text-red-800">
            {{ props.helperText }}
        </div>
    </div>
</template>
