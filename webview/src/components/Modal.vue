<template>
    <div
        v-if="props.open"
        class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#000000aa]"
        @click.self="close"
    >
        <div
            :class="
                twMerge(
                    ' relative min-w-96 min-h-56 bg-[#000000aa] border border-neutral-500 rounded-xl p-3 pt-10',
                    props.class && props.class,
                )
            "
        >
            <Button type="icon" class="absolute right-2 top-2" @click="close"> <Icon icon="icon-close" /></Button>

            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';
import Button from './Button.vue';
import { twMerge } from 'tailwind-merge';

const props = defineProps<{
    open: boolean;
    class?: string;
}>();

const emit = defineEmits<{
    onClose: [];
}>();

const close = () => {
    emit('onClose');
};
</script>
