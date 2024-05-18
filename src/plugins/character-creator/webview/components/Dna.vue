<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import ChevronSelector from '@Components/ChevronSelector.vue';
import Slider from '@Components/Slider.vue';
import { useStore } from '../store';
import Icon from '@Components/Icon.vue';
import { fathers, mothers } from '../const/parentNames';
import '../../translate/index';
import { useTranslate } from '@Shared/translate';

const { t } = useTranslate();
const { appearance, setAppearance, internal, setInternal } = useStore();

const title = t('character.creator.dna');

function motherIndex(val: number) {
    let current = internal.motherIndex;
    current = current + val;
    if (current < 0) current = mothers.length - 1;
    if (current > mothers.length - 1) current = 0;

    setAppearance('faceMother', mothers[current].id);
    setAppearance('skinMother', mothers[current].id);
    setInternal('motherIndex', current);
}

function fatherIndex(val: number) {
    let current = internal.fatherIndex;
    current = current + val;
    if (current < 0) current = fathers.length - 1;
    if (current > fathers.length - 1) current = 0;

    setAppearance('faceFather', fathers[current].id);
    setAppearance('skinFather', mothers[current].id);
    setInternal('fatherIndex', current);
}

function random() {
    const mother = Math.floor(Math.random() * mothers.length);
    const father = Math.floor(Math.random() * fathers.length);
    setInternal('motherIndex', mother);
    setInternal('fatherIndex', father);
    setAppearance('faceMother', mothers[mother].id);
    setAppearance('skinMother', mothers[mother].id);
    setAppearance('faceFather', fathers[mother].id);
    setAppearance('skinFather', fathers[mother].id);
    setAppearance('faceMix', appearance.sex === 1 ? 0.5 + Math.random() * 0.5 : Math.random() * 0.5);
    setAppearance('skinMix', Math.random());
}

function reset() {
    setInternal('motherIndex', 0);
    setInternal('fatherIndex', 0);
    setAppearance('faceMother', 21);
    setAppearance('skinMother', 21);
    setAppearance('faceFather', 0);
    setAppearance('skinFather', 0);
    setAppearance('faceMix', 0.5);
    setAppearance('skinMix', 0.5);
}
</script>
<template>
    <SidePanel position="right" class="gap-6 ">
        <div class="text-3xl font-bold">{{ title }}</div>

        <div class="relative">
            <img class="rounded-3xl" src="/images/background.png" />
            <img class="absolute bottom-0 left-0 w-1/2" :src="`/images/${mothers[internal.motherIndex].name}.png`" />
            <img class="absolute bottom-0 right-0 w-1/2" :src="`/images/${fathers[internal.fatherIndex].name}.png`" />
            <img class="absolute left-0 top-0 w-full rounded-3xl" src="/images/backgroundFrost.png" />
        </div>

        <div class="flex w-full items-center gap-4">
            <ChevronSelector
                :text="mothers[internal.motherIndex].name"
                @onPrev="() => motherIndex(-1)"
                @onNext="() => motherIndex(+1)"
            />
            <ChevronSelector
                :text="fathers[internal.fatherIndex].name"
                @onPrev="() => fatherIndex(-1)"
                @onNext="() => fatherIndex(+1)"
            />
        </div>

        <div class="flex w-full items-center whitespace-nowrap text-xl font-bold">
            <div>{{ t('character.creator.resemblance') }} :</div>
            <Slider
                :value="appearance.faceMix * 100"
                @onChange="(val: number) => setAppearance('faceMix', val / 100)"
            />
        </div>
        <div class="flex w-full items-center whitespace-nowrap text-xl font-bold">
            <div>{{ t('character.creator.skintone') }} :</div>
            <Slider
                :value="appearance.skinMix * 100"
                @onChange="(val: number) => setAppearance('skinMix', val / 100)"
            />
        </div>
        <div class="flex w-full items-center gap-2">
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
