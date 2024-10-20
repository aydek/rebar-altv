<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { onMounted, ref } from 'vue';

interface IProps {
    position?: 'left' | 'right';
    class?: string;
}

const show = ref(false);

const props = withDefaults(defineProps<IProps>(), {
    position: 'left',
    class: '',
});

onMounted(() => {
    setTimeout(() => {
        show.value = true;
    }, 200);
});
</script>

<template>
    <div
        :class="
            twMerge(
                'z-0 transition-all',
                !show && 'opacity-0',

                props.position === 'left' && 'left-panel left-0 items-start bg-gradient-to-r',
                props.position === 'right' && 'right-panel right-0 items-center bg-gradient-to-l',
                'absolute flex h-screen w-[40rem] flex-col justify-center from-black  via-[#00000099] to-transparent px-20 ',
                props.class,
            )
        "
    >
        <div
            :class="
                twMerge(
                    'transition-all',
                    !show && 'opacity-0',
                    'circle pointer-events-none absolute bottom-0 aspect-square w-screen rounded-full',
                    props.position === 'left' && 'left-0 -translate-x-1/2 translate-y-1/2',
                    props.position === 'right' && 'right-0 translate-x-1/2 translate-y-1/2',
                )
            "
        ></div>
        <slot />
    </div>
</template>

<style scoped>
.circle {
    z-index: -1;
    background: radial-gradient(rgba(70, 0, 102, 0.6), #00000000, #00000000);
}
</style>
