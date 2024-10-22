<script setup lang="ts">
import Button from '@Components/Button.vue';
import SidePanel from '@Components/SidePanel.vue';
import CheckBox from '@Components/CheckBox.vue';
import { onMounted, ref } from 'vue';
import Icon from '@Components/Icon.vue';
import { twMerge } from 'tailwind-merge';
import { ISettings } from '../shared/types';
import { altInWindow } from '@Composables/altInWindow';
import { dummyData } from './dummy';
import { useEvents } from '@Composables/useEvents';
import { SettingsEvents } from '../shared/events';
import Slider from '@Components/Slider.vue';

const events = useEvents();

const menuIndex = ref(0);
const settings = ref<ISettings[]>(altInWindow() ? [] : dummyData);

function handleSlider(val: number, index: number, key: string) {
    settings.value[menuIndex.value].options[index].value = val;
    events.emitClient(SettingsEvents.toClient.setSetting, 'chat', key, val);
}

onMounted(() => {
    events.on(SettingsEvents.toWebview.parse, (data: ISettings[]) => (settings.value = data));
});
</script>
<template>
    <SidePanel position="left" v-if="settings.length > 0">
        <div class="flex gap-5 font-bold">
            <div class="flex flex-col items-center justify-center gap-2">
                <Button
                    v-for="(item, index) of settings"
                    :type="menuIndex === index ? 'primary' : 'icon'"
                    :class="twMerge('flex flex-col items-center justify-center gap-1 rounded-lg p-2')"
                    @click="() => (menuIndex = index)"
                >
                    <Icon :icon="item.icon"></Icon>
                    <div>{{ item.title }}</div>
                </Button>
            </div>
            <div class="flex w-96 flex-col divide-y divide-solid text-nowrap">
                <div v-for="(item, index) of settings[menuIndex].options" class="flex justify-between py-3">
                    <div>{{ item.title }}:</div>
                    <CheckBox
                        v-if="item.type === 'boolean'"
                        :checked="item.value"
                        v-on:on-toggle="(checked: boolean) => events.emitClient(SettingsEvents.toClient.setSetting, 'chat', item.key, checked)"
                    />
                    <Slider
                        v-if="item.type === 'slider'"
                        :min="item.min"
                        :max="item.max"
                        :step="0.1"
                        :value="settings[menuIndex].options[index].value"
                        v-on:on-change="(val: number) => handleSlider(val, index, item.key)"
                    />
                </div>
            </div>
        </div>
    </SidePanel>
</template>
