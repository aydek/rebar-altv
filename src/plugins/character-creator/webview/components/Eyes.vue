<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import ChevronSelector from '@Components/ChevronSelector.vue';
import Slider from '@Components/Slider.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import { useStore } from '../store';
import { useTranslate } from '@Shared/translate';
import '../../translate/index';
import { eyeBrows, eyeColors } from '../const/eyesData';
import { HairColors } from '@Shared/data/hairColors';

const { appearance, setAppearance } = useStore();
const { t } = useTranslate();

const title = t('character.creator.eyes');

function eyesColorIndex(val: number) {
    let current = appearance.eyes;
    current = current + val;
    if (current < 0) current = eyeColors.length - 1;
    if (current > eyeColors.length - 1) current = 0;

    setAppearance('eyes', current);
}

function eyeBrowsIndex(val: number) {
    let current = appearance.eyebrows;
    current = current + val;
    if (current < 0) current = eyeBrows.length - 1;
    if (current > eyeBrows.length - 1) current = 0;

    setAppearance('eyebrows', current);
}

function random() {
    setAppearance('eyes', Math.floor(Math.random() * eyeColors.length));
    setAppearance('eyebrows', Math.floor(Math.random() * eyeBrows.length));
    setAppearance('eyebrowsOpacity', 0.5 + Math.random() * 0.5);
    setAppearance('eyebrowsColor1', Math.floor(Math.random() * 63));
}

function reset() {
    setAppearance('eyes', 0);
    setAppearance('eyebrows', 0);
    setAppearance('eyebrowsOpacity', 1);
    setAppearance('eyebrowsColor1', 0);
}
</script>

<template>
    <SidePanel position="right" class="gap-6  font-bold">
        <div class="text-3xl font-bold">{{ title }}</div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.eyes.color') }} :</div>
            <ChevronSelector
                :text="eyeColors[appearance.eyes]"
                @onPrev="eyesColorIndex(-1)"
                @onNext="eyesColorIndex(+1)"
                class="ml-auto w-2/3"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.eyebrows') }} :</div>
            <ChevronSelector
                :text="eyeBrows[appearance.eyebrows]"
                @onPrev="eyeBrowsIndex(-1)"
                @onNext="eyeBrowsIndex(+1)"
                class="ml-auto w-2/3"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.opacity') }} :</div>
            <Slider
                :value="appearance.eyebrowsOpacity * 100"
                @onChange="(val: number) => setAppearance('eyebrowsOpacity', val / 100)"
            />
        </div>

        <div class="w-full">{{ t('character.creator.eyebrows.color') }}:</div>

        <div class="flex flex-wrap gap-1">
            <template v-for="(color, index) in HairColors">
                <Button type="icon" @click="setAppearance('eyebrowsColor1', index)">
                    <div
                        class="aspect-square w-10 rounded-full border border-transparent transition-all hover:border-white"
                        :style="{ 'background-color': color }"
                    ></div
                ></Button>
            </template>
        </div>

        <div class="mt-8 flex w-full items-center gap-2">
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
