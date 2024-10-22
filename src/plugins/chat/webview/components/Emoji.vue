<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Emojilist } from '../utils/emoji';

const emojiText = ref('');

const emit = defineEmits(['closeContainer', 'addEmoji']);

const handleClickOutside = (event: MouseEvent) => {
    emit('closeContainer');
};

function handleMouseEnter(key: string) {
    emojiText.value = `:${key}:`;
}

function handleMouseLeave() {
    emojiText.value = '';
}

onMounted(async () => {
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
    }, 100);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
    <div class="emoji-container absolute top-full z-50 mt-1 h-96 w-[24.3rem] rounded bg-neutral-950 p-1 text-3xl">
        <div class="flex w-full gap-1 bg-neutral-950 py-1 text-base">
            <div>Emoji</div>
            <div>{{ emojiText }}</div>
        </div>

        <div class="flex h-[21rem] w-full flex-wrap overflow-y-scroll">
            <div v-for="(emoji, ekey, eindex) in Emojilist" :key="eindex + emoji">
                <div
                    class="cursor-pointer hover:opacity-75"
                    @mouseenter="() => handleMouseEnter(ekey)"
                    @mouseleave="handleMouseLeave"
                    @click="() => emit('addEmoji', emoji)"
                >
                    {{ emoji }}
                </div>
            </div>
        </div>
    </div>
</template>
