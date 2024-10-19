<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Slider from '@Components/Slider.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import '../../translate/index';
import { useStore } from '../store';
import { useTranslate } from '@Shared/translate';
import { structureNames } from '../const/structureNames';

const { appearance, setAppearance } = useStore();
const { t } = useTranslate();

const title = t('character.creator.features');

function setFeature(index: number, val: number) {
    let clone = [...appearance.structure];
    clone[index] = val;
    setAppearance('structure', clone);
}

function random() {
    let clone = [...appearance.structure];
    for (let i = 0; i < structureNames.length; i++) {
        clone[i] = Math.random() * 2 - 1;
    }
    setAppearance('structure', clone);
}

function reset() {
    let clone = [...appearance.structure];
    for (let i = 0; i < structureNames.length; i++) {
        clone[i] = 0;
    }
    setAppearance('structure', clone);
}
</script>

<template>
    <SidePanel position="right" class="gap-2 font-bold">
        <div class="mb-5 text-3xl font-bold">{{ title }}</div>

        <div class="flex w-full items-center gap-3" v-for="(item, index) in structureNames" :key="index + item">
            <div class="whitespace-nowrap">{{ item }} :</div>
            <Slider
                :min="-1"
                :max="1"
                :step="0.05"
                :value="appearance.structure[index]"
                @onChange="(val: number) => setFeature(index, val)"
            />
        </div>

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
