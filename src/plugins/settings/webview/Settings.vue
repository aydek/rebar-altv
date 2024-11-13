<script setup lang="ts">
import { altInWindow } from '@Composables/altInWindow';
import { ISettingsItem } from '../shared/types';
import { dummyData } from './dummy';
import { onMounted, ref } from 'vue';
import Icon from '@Components/Icon.vue';
import CloseButton from '@Components/CloseButton.vue';
import { twMerge } from 'tailwind-merge';
import CheckBox from '@Components/CheckBox.vue';
import Slider from '@Components/Slider.vue';
import { useEvents } from '@Composables/useEvents';
import { useLocalStorage } from '@Composables/useLocalStorage';
import { SettingsEvents } from '../shared/events';
import FullScreenBG from '@Components/FullScreenBG.vue';

const events = useEvents();
const altStorage = useLocalStorage();

const settings = ref<ISettingsItem[]>(altInWindow() ? [] : dummyData);

onMounted(async () => {
    const result = await events.emitClientRpc(SettingsEvents.toClient.fetchItems);
    if (!result) {
        return;
    }
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
    <FullScreenBG class="grid place-items-center">
        <CloseButton @on-close="handleClose" />
        <div class="flex max-h-[60rem] w-[40rem] flex-col overflow-y-scroll rounded-xl bg-neutral-900 bg-opacity-90 p-5">
            <div v-for="(item, index) of settings" class="flex w-full">
                <div
                    :class="
                        twMerge('flex w-28 flex-col items-center justify-center gap-4 border-r border-neutral-700', index < settings.length - 1 && 'border-b')
                    "
                >
                    <Icon class="h-auto" :icon="item.icon" :size="2" />
                    <div>{{ item.title }}</div>
                </div>
                <div class="flex w-full flex-col gap-2 whitespace-nowrap py-5 pl-5 font-semibold">
                    <template v-for="optionItem of item.options">
                        <div class="flex items-center justify-between">
                            <div>{{ optionItem.title }}:</div>
                            <CheckBox
                                v-if="optionItem.type === 'checkbox'"
                                :checked="optionItem.value as boolean"
                                @onToggle="(val: boolean) => setValue(optionItem.key, val)"
                            />
                            <Slider
                                v-if="optionItem.type === 'slider'"
                                :value="optionItem.value as number"
                                :min="optionItem.min"
                                :max="optionItem.max"
                                :step="optionItem.step"
                                @onChange="(val: number) => setValue(optionItem.key, val)"
                            />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </FullScreenBG>
</template>
