<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Compass from './components/Compass.vue';
import { altInWindow } from '@Composables/altInWindow';
import Speedometer from './components/Speedometer.vue';
import { useStore } from './store';
import { useEvents } from '@Composables/useEvents';
import { HudEvents } from '../shared/events';
import Stats from './components/Stats.vue';
import { useLocalStorage } from '@Composables/useLocalStorage';
import { HudSettingsKeys } from '../shared/settings';
import { twMerge } from 'tailwind-merge';

const store = useStore();
const events = useEvents();
const storage = useLocalStorage();
const allHidden = ref(true);

onMounted(async () => {
    events.emitClient(HudEvents.toClient.startInterval);
    events.on(HudEvents.toWebview.setCompass, store.setCompass);
    events.on(HudEvents.toWebview.setSpeedo, store.setSpeedo);
    if (!altInWindow()) {
        setInterval(() => {
            store.setCompass([{ key: 'heading', value: store.compass.heading + 0.5 }]);
            if (store.compass.heading > 360) {
                store.setCompass([{ key: 'heading', value: 0 }]);
            }
        }, 30);
    }
    allHidden.value = await storage.get(HudSettingsKeys.allHidden);
});
</script>

<template>
    <div :class="twMerge('transition-all', allHidden && 'opacity-0')">
        <Compass />
        <Speedometer />
        <Stats />
    </div>
</template>
