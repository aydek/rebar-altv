<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import Button from './Button.vue';
import Icon from './Icon.vue';

interface IProps {
    class?: string;
    text: string;
}

const props = withDefaults(defineProps<IProps>(), {
    class: '',
});

const emit = defineEmits<{
    onPrev: [];
    onNext: [];
}>();
</script>

<template>
    <div :class="twMerge('flex items-center w-full gap-4', props.class)">
        <Button type="icon" @click="emit('onPrev')">
            <Icon icon="icon-chevron-left" />
        </Button>
        <Button type="disabled" class="text-white w-full">
            {{ props.text }}
        </Button>
        <Button type="icon" @click="emit('onNext')">
            <Icon icon="icon-chevron-right" />
        </Button>
    </div>
</template>
