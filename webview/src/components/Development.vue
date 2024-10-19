<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { PLUGIN_IMPORTS } from '../../pages/plugins';
import { usePages } from '../../composables/usePages';

import Button from '../../components/Button.vue';

const { show, hide } = usePages();

const showToolbar = ref(false);
const visiblePages = ref<{ [key: string]: boolean }>({});

function isVisible(pageName: string) {
    return visiblePages.value[pageName] ? true : false;
}

function togglePage(pageName: string) {
    const isVisible = visiblePages.value[pageName] ? true : false;
    if (isVisible) {
        hide(pageName);
    } else {
        show(pageName, 'overlay');
    }
    visiblePages.value[pageName] = isVisible ? false : true;
    localStorage.setItem('openVuepages', JSON.stringify(visiblePages.value));
}

const pages = computed(() => {
    return Object.keys(PLUGIN_IMPORTS);
});

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'F') {
        showToolbar.value = !showToolbar.value;
        localStorage.setItem('showToolbar', showToolbar.value ? 'Y' : 'N');
    }
};

onMounted(() => {
    setTimeout(() => {
        for (let page of Object.keys(PLUGIN_IMPORTS)) {
            visiblePages.value[page] = false;
        }
        const toolbarState = localStorage.getItem('showToolbar');
        if (toolbarState && toolbarState === 'Y') {
            showToolbar.value = true;
        }
        const storage = localStorage.getItem('openVuepages');
        if (storage) {
            const parsed = JSON.parse(storage);
            for (let pageName of Object.keys(parsed)) {
                if (parsed[pageName]) {
                    show(pageName, 'overlay');
                }
            }

            visiblePages.value = parsed;
        }
    }, 100);
    document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div class="fixed right-0 top-0 z-50">
        <div v-if="showToolbar" class="items-center justify-center p-4">
            <div class="flex w-72 flex-col gap-2">
                <Button
                    v-for="(pageName, index) in pages"
                    :key="index"
                    :type="isVisible(pageName) ? 'primary' : 'secondary'"
                    @click="togglePage(pageName)"
                >
                    {{ pageName }}
                </Button>
            </div>
        </div>
    </div>
</template>
