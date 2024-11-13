<script setup lang="ts">
import Icon from './Icon.vue';
import Button from './Button.vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
    class?: string;
}>();

const emit = defineEmits<{
    onClose: [];
}>();

const close = () => {
    emit('onClose');
};
</script>

<template>
    <Button type="icon" :class="twMerge('absolute right-2 top-2 flex items-center justify-center gap-2', props.class && props.class)" @click="close">
        <Icon icon="icon-close" />
        <div>ESC</div>
    </Button>
</template>
