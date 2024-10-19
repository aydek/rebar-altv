<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import ChevronSelector from '@Components/ChevronSelector.vue';
import Slider from '@Components/Slider.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import Accordion from '@Components/Accordion.vue';
import { useStore } from '../store';
import { chestHairNames, facialHairNames, hairList } from '../const/hairData';
import { Appearance } from '@Shared/types';

import '../../translate/index';
import { useTranslate } from '@Shared/translate';
import { HairColors } from '@Shared/data/hairColors';

const { t } = useTranslate();

const title = t('character.creator.hair');

const colorItems = [
    {
        id: 1,
        title: t('character.creator.hair.color'),
        parameter: 'hairColor1',
    },
    {
        id: 2,
        title: t('character.creator.highlight.color'),
        parameter: 'hairColor2',
    },
    {
        id: 3,
        title: t('character.creator.facial.color'),
        parameter: 'facialHairColor1',
    },
    {
        id: 4,
        title: t('character.creator.chest.color'),
        parameter: 'chestHairColor1',
    },
];

const { internal, setInternal, appearance, setAppearance } = useStore();

function hairIndex(val: number) {
    let current = internal.hairIndex;
    current = current + val;
    if (current < 0) current = hairList[appearance.sex].length - 1;
    if (current > hairList[appearance.sex].length - 1) current = 0;

    setAppearance('hair', hairList[appearance.sex][current].id);
    setInternal('hairIndex', current);
}

function facialHairIndex(val: number) {
    let current = appearance.facialHair;
    current = current + val;
    if (current < 0) current = facialHairNames.length - 1;
    if (current > facialHairNames.length - 1) current = 0;

    setAppearance('facialHair', current);
}

function chestHairIndex(val: number) {
    let current = appearance.chestHair;
    current = current + val;
    if (current < 0) current = chestHairNames.length - 1;
    if (current > chestHairNames.length - 1) current = 0;
    setAppearance('chestHair', current);
}

function random() {
    const hair = Math.floor(Math.random() * hairList[appearance.sex].length);

    setInternal('hairIndex', hair);
    setAppearance('hair', hairList[appearance.sex][hair].id);
    setAppearance('hairColor1', Math.floor(Math.random() * 63));
    setAppearance('hairColor2', Math.floor(Math.random() * 63));
    setAppearance('facialHair', Math.floor(Math.random() * facialHairNames.length));
    setAppearance('facialHairColor1', Math.floor(Math.random() * 63));
    setAppearance('facialHairOpacity', appearance.sex === 1 ? 0.5 + Math.random() * 0.5 : 0);
    setAppearance('chestHair', Math.floor(Math.random() * chestHairNames.length));
    setAppearance('chestHairColor1', Math.floor(Math.random() * 63));
    setAppearance('chestHairOpacity', appearance.sex === 1 ? 0.5 + Math.random() * 0.5 : 0);
}

function reset() {
    setInternal('hairIndex', 0);
    setAppearance('hair', 0);
    setAppearance('hairColor1', 0);
    setAppearance('hairColor2', 0);
    setAppearance('facialHair', facialHairNames.length - 1);
    setAppearance('facialHairColor1', 0);
    setAppearance('facialHairOpacity', appearance.sex === 1 ? 1 : 0);
    setAppearance('chestHair', chestHairNames.length - 1);
    setAppearance('chestHairColor1', 0);
    setAppearance('chestHairOpacity', appearance.sex === 1 ? 1 : 0);
}
</script>

<template>
    <SidePanel position="right" class="gap-6 font-bold">
        <div class="text-3xl font-bold">{{ title }}</div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.hair') }} :</div>
            <ChevronSelector
                :text="hairList[appearance.sex][internal.hairIndex].name"
                @onPrev="() => hairIndex(-1)"
                @onNext="() => hairIndex(+1)"
                class="ml-auto w-2/3"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.facial.hair') }} :</div>
            <ChevronSelector
                :text="facialHairNames[appearance.facialHair]"
                @onPrev="() => facialHairIndex(-1)"
                @onNext="() => facialHairIndex(+1)"
                class="ml-auto w-2/3"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.opacity') }} :</div>
            <Slider
                :value="appearance.facialHairOpacity * 100"
                @onChange="(val: number) => setAppearance('facialHairOpacity', val / 100)"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.chest.hair') }} :</div>
            <ChevronSelector
                :text="chestHairNames[appearance.chestHair]"
                @onPrev="() => chestHairIndex(-1)"
                @onNext="() => chestHairIndex(+1)"
                class="ml-auto w-2/3"
            />
        </div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap">{{ t('character.creator.opacity') }} :</div>
            <Slider
                :value="appearance.chestHairOpacity * 100"
                @onChange="(val: number) => setAppearance('chestHairOpacity', val / 100)"
            />
        </div>

        <Accordion :items="colorItems">
            <template v-for="item in colorItems" v-slot:[item.title]>
                <div class="flex flex-wrap gap-1">
                    <template v-for="(color, index) in HairColors">
                        <Button type="icon" @click="setAppearance(item.parameter as keyof Appearance, index)">
                            <div
                                class="aspect-square w-10 rounded-full border border-transparent transition-all hover:border-white"
                                :style="{ 'background-color': color }"
                            ></div
                        ></Button>
                    </template>
                </div>
            </template>
        </Accordion>

        <div class="mt-5 flex w-full items-center gap-2">
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
