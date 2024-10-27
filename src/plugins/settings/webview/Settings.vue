<script setup lang="ts">
import { altInWindow } from '@Composables/altInWindow';
import { ISettingsItem } from '../shared/types';
import { dummyData } from './dummy';
import { onMounted, ref } from 'vue';
import CenterBox from '@Components/CenterBox.vue';
import Icon from '@Components/Icon.vue';
import Button from '@Components/Button.vue';
import { twMerge } from 'tailwind-merge';
import CheckBox from '@Components/CheckBox.vue';
import Slider from '@Components/Slider.vue';
import { useEvents } from '@Composables/useEvents';
import { useLocalStorage } from '@Composables/useLocalStorage';
import { SettingsEvents } from '../shared/events';

const events = useEvents();
const altStorage = useLocalStorage();

const settings = ref<ISettingsItem[]>(altInWindow() ? [] : dummyData);
const tabIndex = ref(0);

onMounted(async () => {
    const result = await events.emitClientRpc(SettingsEvents.toClient.fetchItems);
    settings.value = result;
});

function setValue(key: string, value: boolean | number) {
    altStorage.set(key, value);
}

function handleClose() {
    events.emitClient(SettingsEvents.toClient.close);
}
</script>
<template>
    <CenterBox class="w-1/4" v-if="settings.length > 0" @onClose="handleClose">
        <div class="flex w-full">
            <template v-for="(item, index) of settings">
                <Button
                    :type="tabIndex === index ? 'primary' : 'secondary'"
                    :class="
                        twMerge(
                            'w-full',
                            index === 0 && 'rounded-r-none border-r-0',
                            index > 0 && index < settings.length - 1 && 'rounded-l-none rounded-r-none border-x-0',
                            index >= settings.length - 1 && 'rounded-l-none border-l-0',
                        )
                    "
                    @click="() => (tabIndex = index)"
                >
                    <Icon class="h-auto" :icon="item.icon" :size="3" />
                    <div>{{ item.title }}</div>
                </Button>
            </template>
        </div>

        <div class="mt-5 flex flex-col gap-2 whitespace-nowrap font-semibold">
            <template v-for="item of settings[tabIndex].options">
                <div class="flex items-center justify-between">
                    <div>{{ item.title }}:</div>
                    <CheckBox v-if="item.type === 'checkbox'" :checked="item.value as boolean" @onToggle="(val: boolean) => setValue(item.key, val)" />
                    <Slider
                        v-if="item.type === 'slider'"
                        :value="item.value as number"
                        :min="item.min"
                        :max="item.max"
                        :step="item.step"
                        @onChange="(val: number) => setValue(item.key, val)"
                    />
                </div>
            </template>
        </div>
    </CenterBox>
</template>
