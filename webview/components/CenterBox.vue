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
    <div class="grid h-screen w-screen place-items-center">
        <div :class="twMerge(' relative  rounded-xl border border-neutral-500 bg-black bg-opacity-50 p-3 pt-10', props.class && props.class)">
            <Button type="icon" class="absolute right-2 top-2" @click="close"> <Icon icon="icon-close" /></Button>

            <slot />
        </div>
    </div>
</template>
