<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { onMounted, ref } from 'vue';

interface IProps {
    position?: 'left' | 'right';
}

const show = ref(false);

const props = withDefaults(defineProps<IProps>(), {
    position: 'left',
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
                'transition-all z-0',
                !show && 'opacity-0',

                props.position === 'left' && 'bg-gradient-to-r left-0 items-start',
                props.position === 'right' && 'bg-gradient-to-l right-0 items-center',
                'absolute w-[40rem] h-screen flex flex-col justify-center px-20  from-black via-[#00000099] to-transparent',
            )
        "
    >
        <div
            :class="
                twMerge(
                    'transition-all',
                    !show && 'opacity-0',
                    'circle absolute w-screen aspect-square rounded-full bottom-0 pointer-events-none',
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
