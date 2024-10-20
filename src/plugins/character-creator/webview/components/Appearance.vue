<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import ChevronSelector from '@Components/ChevronSelector.vue';
import Slider from '@Components/Slider.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import '../../translate/index';
import { useStore } from '../store';
import { useTranslate } from '@Shared/translate';
import { appearanceItemNames, appearanceNames } from '../const/appearanceData';

const { appearance, setAppearance } = useStore();
const { t } = useTranslate();

const title = t('character.creator.appearance');

function appearanceIndex(index: number, val: number) {
    let clone = JSON.parse(JSON.stringify(appearance.headOverlays));

    let current = clone[index].value;
    current = current + val;
    if (current < -1) current = appearanceItemNames[index].length - 2;
    if (current > appearanceItemNames[index].length - 2) current = -1;
    clone[index].value = current;
    setAppearance('headOverlays', clone);
}

function handleOpacity(index: number, val: number) {
    let clone = JSON.parse(JSON.stringify(appearance.headOverlays));
    clone[index].opacity = val / 100;
    setAppearance('headOverlays', clone);
}

function handleColor(index: number, val: number) {
    let clone = JSON.parse(JSON.stringify(appearance.headOverlays));
    clone[index].color1 = val;
    setAppearance('headOverlays', clone);
}

function random() {
    let clone = JSON.parse(JSON.stringify(appearance.headOverlays));

    for (let i = 0; i < clone.length; i++) {
        clone[i].value = Math.floor(Math.random() * appearanceItemNames[i].length - 1);
        clone[i].opacity = 0.5 + Math.random() * 0.5;
        clone[i].color1 = Math.floor(Math.random() * 63);
    }
    setAppearance('headOverlays', clone);
}

function reset() {
    let clone = JSON.parse(JSON.stringify(appearance.headOverlays));

    for (let i = 0; i < clone.length; i++) {
        clone[i].value = -1;
        clone[i].opacity = 1;
        clone[i].color1 = 0;
    }
    setAppearance('headOverlays', clone);
}
</script>

<template>
    <SidePanel position="right" class="gap-6  font-bold">
        <div class="text-4xl font-bold">{{ title }}</div>

        <template v-for="(item, index) in appearanceNames" :key="index + item">
            <div class="w-full">
                <div class="flex w-full items-center gap-3">
                    <div class="whitespace-nowrap">{{ appearanceNames[index] }} :</div>
                    <ChevronSelector
                        :text="appearanceItemNames[index][appearance.headOverlays[index].value + 1]"
                        @onPrev="appearanceIndex(index, -1)"
                        @onNext="appearanceIndex(index, +1)"
                        class="ml-auto w-2/3"
                    />
                </div>

                <div class="flex w-full items-center gap-3">
                    <div class="whitespace-nowrap">{{ t('character.creator.opacity') }} :</div>
                    <Slider
                        :value="appearance.headOverlays[index].opacity * 100"
                        @onChange="(val: number) => handleOpacity(index, val)"
                    />
                </div>

                <div class="flex w-full items-center gap-3" v-if="item === 'Blush' || item === 'Lipstick'">
                    <div class="whitespace-nowrap">{{ 'Color' }} :</div>
                    <Slider
                        :value="appearance.headOverlays[index].color1"
                        :max="63"
                        @onChange="(val: number) => handleColor(index, val)"
                    />
                </div>
            </div>
        </template>

        <div class=" flex w-full items-center gap-2">
            <Button type="secondary" class="flex w-full items-center justify-center gap-3" @click="reset">
                <Icon icon="icon-cross1" :size="1" />
                <div>{{ t('character.creator.reset') }}</div>
            </Button>
            <Button class="flex w-full items-center justify-center gap-3" @click="random">
                <div>{{ t('character.creator.random') }}</div>
                <Icon icon="icon-shuffle" :size="1.1" />
            </Button>
        </div>
    </SidePanel>
</template>
