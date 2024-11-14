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
    <Button type="icon" :class="twMerge('absolute right-4 top-2 ', props.class && props.class)" @click="close">
        <div class="flex items-center justify-center gap-2 rounded-xl border p-2">
            <Icon icon="icon-close" :size="2" />
            <div>ESC</div>
        </div>
    </Button>
</template>
