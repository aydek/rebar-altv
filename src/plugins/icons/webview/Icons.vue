<template>
    <FullScreenBG class="z-30">
        <div class="bg-neutral-900 h-20">
            <TextField
                label="Search for icons..."
                @onChange="(text:string) => getIcons(text)"
                class="absolute w-full px-96"
                :autoFocus="true"
            />
        </div>

        <div class="grid grid-cols-8 gap-5 h-full overflow-y-scroll">
            <Button
                v-for="(item, index) in renderIcons"
                type="icon"
                class="flex flex-col justify-center items-center gap-2"
                @click="copyToClipboard(item)"
            >
                <Icon :key="index" :icon="item" :size="4" />
                <div>{{ item }}</div>
            </Button>
        </div>
    </FullScreenBG>
</template>

<script setup lang="ts">
import Icon from '@Components/Icon.vue';
import FullScreenBG from '@Components/FullScreenBG.vue';
import Button from '@Components/Button.vue';
import TextField from '@Components/TextField.vue';
import { onMounted, ref } from 'vue';
import { allIcons } from './allIcons';

const renderIcons = ref([]);

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    console.log('Copied: ' + text);
}

function getIcons(search: string = '') {
    renderIcons.value = [];
    let icons = [];
    if (search.length > 0) {
        icons = allIcons.filter((icon) => icon.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
        for (let i = 0; i < 100; i++) {
            if (icons[i]) renderIcons.value.push(icons[i]);
            else break;
        }
    } else {
        for (let i = 0; i < 40; i++) {
            renderIcons.value.push(allIcons[i]);
        }
    }
}

onMounted(() => {
    getIcons();
});
</script>
