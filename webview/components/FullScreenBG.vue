<script setup lang="ts"></script>

<template>
    <div class="absolute h-screen w-screen bg-black bg-opacity-50">
        <div class="circle bottom"></div>
        <div class="circle top"></div>
        <slot />
    </div>
</template>

<style scoped>
.circle {
    position: absolute;
    pointer-events: none;
    width: 100vw;
    aspect-ratio: 1/1;
    border-radius: 50%;
    z-index: -50;
}

.bottom {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    background: radial-gradient(rgba(70, 0, 102, 0.6), #00000000, #00000000);
}

.top {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background: radial-gradient(rgba(0, 102, 88, 0.6), #00000000, #00000000);
}
</style>
