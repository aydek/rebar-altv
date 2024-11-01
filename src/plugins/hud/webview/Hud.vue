<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Compass from './components/Compass.vue';
import { altInWindow } from '@Composables/altInWindow';
import Speedometer from './components/Speedometer.vue';
import { useStore } from './store';
import { useEvents } from '@Composables/useEvents';
import { HudEvents } from '../shared/events';

const store = useStore();
const events = useEvents();

onMounted(() => {
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
});
</script>

<template>
    <Compass />
    <Speedometer />
</template>
