<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import { nextTick, onMounted, ref, toRaw } from 'vue';
import maleHats from '@Shared/json/clothing/maleHats.json';
import femaleHats from '@Shared/json/clothing/femaleHats.json';
import { ClothingItemData } from '@Shared/types';
import { useKeyPress } from '@Composables/useKeyPress';
import { useStore } from '../store';
import { useAudio } from '@Composables/useAudio';
import { useTranslate } from '@Shared/translate';
import { PropKey } from '@Shared/data/clothing';
import '../../translate/index';

const { appearance, internal, setInternal, setClothes } = useStore();
const keys = useKeyPress();
const audio = useAudio();

const { t } = useTranslate();

const title = t('character.creator.hat');

const allItems = ref<ClothingItemData[]>([]);

const scrollRef = ref(null);

onMounted(() => {
    if (appearance.sex === 1) {
        allItems.value = [
            {
                id: PropKey.hat,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...maleHats.filter(
                (item) =>
                    (item.dlc === '' || item.dlc === 'mp_f_lowrider_01' || item.dlc === 'mp_f_heist4') &&
                    !item.name.includes('Helmet') &&
                    !item.name.includes('Defenders') &&
                    !item.name.includes('Advanced') &&
                    !item.name.includes('Headphones'),
            ),
        ];
    } else {
        allItems.value = [
            {
                id: PropKey.hat,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...femaleHats.filter(
                (item) =>
                    (item.dlc === '' || item.dlc === 'mp_f_lowrider_01' || item.dlc === 'mp_f_heist4') &&
                    !item.name.includes('Helmet') &&
                    !item.name.includes('Defenders') &&
                    !item.name.includes('Advanced') &&
                    !item.name.includes('Headphones'),
            ),
        ];
    }

    setTimeout(() => {
        autoScroll();
    }, 600);
});

keys.onKeyDown('ArrowDown', () => {
    if (internal.modalOpen) return;
    keyboardIndex(+1);
});

keys.onKeyDown('ArrowUp', () => {
    if (internal.modalOpen) return;
    keyboardIndex(-1);
});

function keyboardIndex(value: number) {
    let current = internal.hatIndex;
    current += value;
    if (current > allItems.value.length - 1) current = 0;
    if (current < 0) current = allItems.value.length - 1;
    setIndex(current);
    audio.play('/sounds/select.ogg');
    autoScroll();
}

function setIndex(index: number) {
    if (index !== internal.hatIndex) {
        setInternal('hatIndex', index);
        setClothes(true, PropKey.hat, toRaw(allItems.value[index]));
    }
}

function random() {
    setIndex(Math.floor(Math.random() * allItems.value.length));
    autoScroll();
}

function reset() {
    setIndex(0);
    autoScroll();
}

function autoScroll() {
    nextTick(() => {
        const target = scrollRef.value[0];
        if (target) target.scrollIntoView({ block: 'end' });
    });
}
</script>

<template>
    <SidePanel position="right" class="gap-6 font-bold">
        <div class="text-3xl font-bold">{{ title }}</div>

        <div class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-scroll pr-3 outline-none" :tabindex="-1">
            <template v-for="(item, index) in allItems" :key="index + item.name">
                <Button @click="setIndex(index)" :type="internal.hatIndex === index ? 'primary' : 'secondary'">{{
                    item.name
                }}</Button>
                <div class="-m-1" v-if="internal.hatIndex === index" ref="scrollRef"></div>
            </template>
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

        <div class="mt-5 flex items-center justify-center gap-2">
            <div>{{ t('character.creator.use') }}</div>
            <Icon
                icon="icon-long-arrow-up"
                :size="1"
                class="aspect-square w-7 rounded border border-white bg-neutral-600"
            />
            <Icon
                icon="icon-long-arrow-down"
                :size="1"
                class="aspect-square w-7 rounded border border-white bg-neutral-600"
            />
            <div>{{ t('character.creator.to.navigate') }}</div>
        </div>
    </SidePanel>
</template>
