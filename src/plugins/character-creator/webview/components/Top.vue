<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import { nextTick, onMounted, ref, toRaw, watch } from 'vue';
import '../../translate/index';
import { useStore } from '../store';
import { useTranslate } from '@Shared/translate';
import { useKeyPress } from '@Composables/useKeyPress';
import { useAudio } from '@Composables/useAudio';
import { ClothingItemData, ClothingTopItemData, getListFromDlc } from '@Shared/data/clothingNames/clothingNames';
import { ClothingKey } from '@Shared/data/clothingKeys';

const { appearance, internal, setInternal, setClothes } = useStore();

const { t } = useTranslate();
const keys = useKeyPress();
const audio = useAudio();

const title = t('character.creator.top');

const tabIndex = ref(0);
const allItems: ClothingTopItemData[] = getListFromDlc(
    appearance.sex,
    false,
    ClothingKey.tops,
    [''],
    ['None'],
) as ClothingTopItemData[];

const allUndershirts = getListFromDlc(appearance.sex, false, ClothingKey.undershirts, 'all');
const allTorsos = getListFromDlc(appearance.sex, false, ClothingKey.torso, 'all');
const availableUndershirts = ref<ClothingItemData[]>([]);

const scrollRef = ref(null);

onMounted(() => {
    setTimeout(() => {
        autoScroll();
    }, 20);
});

watch(
    () => internal.topsIndex,
    (val) => {
        availableUndershirts.value = [];
        const target: ClothingTopItemData = allItems[val];
        const newValue = [];
        if (target && target.combos.length > 1) {
            for (const combo of target.combos) {
                newValue.push(allUndershirts.find((item) => item.id === combo.undershirt));
            }
            availableUndershirts.value = toRaw(newValue);
        }
    },
);

keys.onKeyDown('ArrowDown', (ev: KeyboardEvent) => {
    if (internal.modalOpen) return;
    keyboardIndex(+1, tabIndex.value);
    autoScroll();
});

keys.onKeyDown('ArrowUp', (ev: KeyboardEvent) => {
    if (internal.modalOpen) return;
    keyboardIndex(-1, tabIndex.value);
    autoScroll();
});

keys.onKeyDown('ArrowLeft', (ev: KeyboardEvent) => {
    if (internal.modalOpen) return;
    tabIndex.value = 0;
    autoScroll();
});

keys.onKeyDown('ArrowRight', (ev: KeyboardEvent) => {
    if (internal.modalOpen) return;
    if (availableUndershirts.value.length > 0) {
        tabIndex.value = 1;
        autoScroll();
    }
});

function keyboardIndex(value: number, tabindex: number) {
    if (tabindex === 0) {
        let current = internal.topsIndex;
        current += value;
        if (current > allItems.length - 1) current = 0;
        if (current < 0) current = allItems.length - 1;
        setIndex(current, tabindex);
    } else if (tabindex === 1) {
        let current = internal.undershirtIndex;
        current += value;
        if (current > availableUndershirts.value.length - 1) current = 0;
        if (current < 0) current = availableUndershirts.value.length - 1;
        setIndex(current, tabindex);
    }

    audio.play('/sounds/select.ogg');
}

function setIndex(index: number, tabindex: number) {
    if (tabindex === 0) {
        if (index !== internal.topsIndex) {
            const combos = allItems[index].combos;

            let torsoItem: ClothingItemData = undefined;
            let undershirtItem: ClothingItemData = undefined;

            if (combos[0]) {
                torsoItem = allTorsos.find((i) => i.id === combos[0].torso);
                undershirtItem = allUndershirts.find((i) => i.id === combos[0].undershirt);
            }

            setInternal('topsIndex', index);
            setInternal('undershirtIndex', 0);

            setClothes(false, ClothingKey.tops, toRaw(allItems[index]));

            if (undershirtItem) {
                setClothes(false, ClothingKey.undershirts, toRaw(undershirtItem));
            }

            if (torsoItem) {
                setClothes(false, ClothingKey.torso, toRaw(torsoItem));
            }
        }
    } else if (tabindex === 1) {
        if (index !== internal.undershirtIndex && availableUndershirts.value.length > 0) {
            setInternal('undershirtIndex', index);

            const combos = allItems[internal.topsIndex].combos;

            let torsoItem: ClothingItemData = undefined;

            if (combos[index]) {
                torsoItem = allTorsos.find((i) => i.id === combos[index].torso);
            }

            setClothes(false, ClothingKey.undershirts, toRaw(availableUndershirts.value[index]));

            if (torsoItem) {
                setClothes(false, ClothingKey.torso, toRaw(torsoItem));
            }
        }
    }
}

function random() {
    tabIndex.value = 0;
    setIndex(Math.floor(Math.random() * allItems.length), 0);
    nextTick(() => {
        setIndex(Math.floor(Math.random() * availableUndershirts.value.length), 1);
    });

    autoScroll();
}

function reset() {
    tabIndex.value = 0;
    setIndex(0, 0);
    autoScroll();
}

function autoScroll() {
    nextTick(() => {
        const target = scrollRef.value[0];
        if (target) target.scrollIntoView({ block: 'end' });
    });
}

function setTabIndex(index: number) {
    tabIndex.value = index;
    autoScroll();
}
</script>

<template>
    <SidePanel position="right" class="gap-6 font-bold">
        <div class="text-3xl font-bold">{{ title }}</div>

        <div class="flex w-full" v-if="allItems[internal.topsIndex]">
            <Button
                :type="tabIndex === 0 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-r-0"
                @click="setTabIndex(0)"
            >
                <div>{{ t('character.creator.top') }}</div>
            </Button>

            <Button
                :type="availableUndershirts.length < 2 ? 'disabled' : tabIndex === 1 ? 'primary' : 'secondary'"
                class="w-full rounded-none border-l-0"
                @click="setTabIndex(1)"
            >
                <div>{{ t('character.creator.undershirt') }}</div>
            </Button>
        </div>

        <div
            :class="'flex max-h-[50%] w-full flex-col gap-2 overflow-y-auto pr-3 outline-none'"
            :tabindex="-1"
            v-if="tabIndex === 1"
        >
            <template v-for="(item, index) in availableUndershirts" :key="index + item.name">
                <Button
                    @click="setIndex(index, 1)"
                    :type="internal.undershirtIndex === index ? 'primary' : 'secondary'"
                    >{{ item.name }}</Button
                >
                <div class="-m-1" v-if="internal.undershirtIndex === index" ref="scrollRef"></div>
            </template>
        </div>

        <div
            class="flex max-h-[50%] w-full flex-col gap-2 overflow-y-auto pr-3 outline-none"
            :tabindex="-1"
            v-if="tabIndex === 0"
        >
            <template v-for="(item, index) in allItems" :key="index + item.name">
                <Button @click="setIndex(index, 0)" :type="internal.topsIndex === index ? 'primary' : 'secondary'">{{
                    item.name
                }}</Button>
                <div class="-m-1" v-if="internal.topsIndex === index" ref="scrollRef"></div>
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
