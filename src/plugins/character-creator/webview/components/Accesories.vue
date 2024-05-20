<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';

import { nextTick, onMounted, ref, toRaw } from 'vue';

import maleWatches from '@Shared/json/clothing/maleWatches.json';
import femaleWatches from '@Shared/json/clothing/femaleWatches.json';
import maleGlasses from '@Shared/json/clothing/maleGlasses.json';
import femaleGlasses from '@Shared/json/clothing/femaleGlasses.json';
import maleBracelets from '@Shared/json/clothing/maleBracelets.json';
import femaleBracelets from '@Shared/json/clothing/femaleBracelets.json';
import maleEars from '@Shared/json/clothing/maleEars.json';
import femaleEars from '@Shared/json/clothing/femaleEars.json';
import { ClothingItemData } from '@Shared/types';
import { useStore } from '../store';
import { useKeyPress } from '@Composables/useKeyPress';
import { useAudio } from '@Composables/useAudio';
import { useTranslate } from '@Shared/translate';
import '../../translate/index';
import { PropKey } from '@Shared/data/clothing';

const { appearance, internal, setInternal, setClothes } = useStore();
const keys = useKeyPress();
const audio = useAudio();
const { t } = useTranslate();

const title = t('character.creator.accesories');

const allWatches = ref<ClothingItemData[]>([]);
const allBracelets = ref<ClothingItemData[]>([]);
const allEarings = ref<ClothingItemData[]>([]);
const allGlasses = ref<ClothingItemData[]>([]);

const tabIndex = ref(0);
const scrollRef = ref(null);

onMounted(() => {
    if (appearance.sex === 1) {
        allWatches.value = [
            {
                id: PropKey.watch,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...maleWatches.filter((item, index) => item.dlc !== '' && index < 40),
        ];
        allBracelets.value = [
            {
                id: PropKey.bracelet,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...maleBracelets,
        ];
        allEarings.value = [
            {
                id: PropKey.ears,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...maleEars.filter((item, index) => !item.name.includes('Earpiece') && index < 40),
        ];
        allGlasses.value = [
            {
                id: PropKey.glasses,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...maleGlasses.filter((item) => item.dlc === ''),
        ];
    } else {
        allWatches.value = [
            {
                id: PropKey.watch,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...femaleWatches.filter((_item, index) => index < 20),
        ];
        allBracelets.value = [
            {
                id: PropKey.bracelet,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...femaleBracelets,
        ];
        allEarings.value = [
            {
                id: PropKey.ears,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...femaleEars.filter(
                (item, index) => !item.name.includes('Earpiece') && !item.name.includes('Earphones') && index < 40,
            ),
        ];
        allGlasses.value = [
            {
                id: PropKey.glasses,
                drawable: -1,
                dlc: '',
                name: 'None',
                texture: 0,
            },
            ...femaleGlasses.filter((item) => item.dlc === ''),
        ];
    }

    setTimeout(() => {
        autoScroll();
    }, 600);
});

keys.onKeyDown('ArrowLeft', () => {
    if (internal.modalOpen) return;
    if (tabIndex.value === 0) return;
    tabIndex.value = tabIndex.value - 1;
    audio.play('/sounds/select.ogg');
    autoScroll();
});

keys.onKeyDown('ArrowRight', () => {
    if (internal.modalOpen) return;
    if (tabIndex.value === 3) return;
    tabIndex.value = tabIndex.value + 1;
    audio.play('/sounds/select.ogg');
    autoScroll();
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
    let current = 0;
    if (tabIndex.value === 0) {
        current = internal.glassesIndex;
        current += value;
        if (current > allGlasses.value.length - 1) current = 0;
        if (current < 0) current = allGlasses.value.length - 1;
    } else if (tabIndex.value === 1) {
        current = internal.watchIndex;
        current += value;
        if (current > allWatches.value.length - 1) current = 0;
        if (current < 0) current = allWatches.value.length - 1;
    } else if (tabIndex.value === 2) {
        current = internal.earingIndex;
        current += value;
        if (current > allEarings.value.length - 1) current = 0;
        if (current < 0) current = allEarings.value.length - 1;
    } else if (tabIndex.value === 3) {
        current = internal.braceletIndex;
        current += value;
        if (current > allBracelets.value.length - 1) current = 0;
        if (current < 0) current = allBracelets.value.length - 1;
    }

    setIndex(tabIndex.value, current);
    audio.play('/sounds/select.ogg');
    autoScroll();
}

function setIndex(tab: number, index: number) {
    if (tab === 0) {
        if (index !== internal.glassesIndex) {
            setInternal('glassesIndex', index);
            setClothes(true, PropKey.glasses, toRaw(allGlasses.value[index]));
        }
    } else if (tab === 1) {
        if (index !== internal.watchIndex) {
            setInternal('watchIndex', index);
            setClothes(true, PropKey.watch, toRaw(allWatches.value[index]));
        }
    } else if (tab === 2) {
        if (index !== internal.earingIndex) {
            setInternal('earingIndex', index);
            setClothes(true, PropKey.ears, toRaw(allEarings.value[index]));
        }
    } else if (tab === 3) {
        if (index !== internal.braceletIndex) {
            setInternal('braceletIndex', index);
            setClothes(true, PropKey.bracelet, toRaw(allBracelets.value[index]));
        }
    }
}

function random() {
    if (tabIndex.value === 0) setIndex(0, Math.floor(Math.random() * allGlasses.value.length));
    if (tabIndex.value === 1) setIndex(1, Math.floor(Math.random() * allWatches.value.length));
    if (tabIndex.value === 2) setIndex(2, Math.floor(Math.random() * allEarings.value.length));
    if (tabIndex.value === 3) setIndex(3, Math.floor(Math.random() * allBracelets.value.length));
    autoScroll();
}

function reset() {
    if (tabIndex.value === 0) setIndex(0, 0);
    if (tabIndex.value === 1) setIndex(1, 0);
    if (tabIndex.value === 2) setIndex(2, 0);
    if (tabIndex.value === 3) setIndex(3, 0);
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

        <div class="flex w-full">
            <Button
                :type="tabIndex === 0 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-r-0"
                @click="() => (tabIndex = 0)"
            >
                <Icon icon="icon-spectacle-lenses" :size="3" />
            </Button>

            <Button
                :type="tabIndex === 1 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-x-0"
                @click="() => (tabIndex = 1)"
            >
                <Icon icon="icon-watch" :size="3" />
            </Button>
            <Button
                :type="tabIndex === 2 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-x-0"
                @click="() => (tabIndex = 2)"
            >
                <Icon icon="icon-hearing" :size="3" />
            </Button>
            <Button
                :type="tabIndex === 3 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-l-0"
                @click="() => (tabIndex = 3)"
            >
                <Icon icon="icon-linked-rings" :size="3" />
            </Button>
        </div>

        <div
            class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-scroll pr-3 outline-none"
            :tabindex="-1"
            v-if="tabIndex === 0"
        >
            <template v-for="(item, index) in allGlasses" :key="index + item.name">
                <Button
                    @click="setIndex(tabIndex, index)"
                    :type="internal.glassesIndex === index ? 'primary' : 'secondary'"
                    >{{ item.name }}</Button
                >
                <div class="-m-1" v-if="internal.glassesIndex === index" ref="scrollRef"></div>
            </template>
        </div>

        <div
            class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-scroll pr-3 outline-none"
            :tabindex="-1"
            v-if="tabIndex === 1"
        >
            <template v-for="(item, index) in allWatches" :key="index + item.name">
                <Button
                    @click="setIndex(tabIndex, index)"
                    :type="internal.watchIndex === index ? 'primary' : 'secondary'"
                    >{{ item.name }}</Button
                >
                <div class="-m-1" v-if="internal.watchIndex === index" ref="scrollRef"></div>
            </template>
        </div>

        <div
            class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-scroll pr-3 outline-none"
            :tabindex="-1"
            v-if="tabIndex === 2"
        >
            <template v-for="(item, index) in allEarings" :key="index + item.name">
                <Button
                    @click="setIndex(tabIndex, index)"
                    :type="internal.earingIndex === index ? 'primary' : 'secondary'"
                    >{{ item.name }}</Button
                >
                <div class="-m-1" v-if="internal.earingIndex === index" ref="scrollRef"></div>
            </template>
        </div>

        <div
            class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-scroll pr-3 outline-none"
            :tabindex="-1"
            v-if="tabIndex === 3"
        >
            <template v-for="(item, index) in allBracelets" :key="index + item.name">
                <Button
                    @click="setIndex(tabIndex, index)"
                    :type="internal.braceletIndex === index ? 'primary' : 'secondary'"
                    >{{ item.name }}</Button
                >
                <div class="-m-1" v-if="internal.braceletIndex === index" ref="scrollRef"></div>
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
            <Icon
                icon="icon-long-arrow-left"
                :size="1"
                class="aspect-square w-7 rounded border border-white bg-neutral-600"
            />
            <Icon
                icon="icon-long-arrow-right"
                :size="1"
                class="aspect-square w-7 rounded border border-white bg-neutral-600"
            />
            <div>{{ t('character.creator.to.navigate') }}</div>
        </div>
    </SidePanel>
</template>
