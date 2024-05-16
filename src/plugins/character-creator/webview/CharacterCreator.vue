<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import Dna from './components/Dna.vue';
import Hair from './components/Hair.vue';
import Eyes from './components/Eyes.vue';
import { useStore } from './store';
import '../translate/index';
import { useTranslate } from '@Shared/translate';
import { useKeyPress } from '@Composables/useKeyPress';
import { useAudio } from '@Composables/useAudio';

const { t } = useTranslate();
const keys = useKeyPress();
const audio = useAudio();

const navigationItems = [
    { title: t('character.creator.dna'), component: Dna, icon: 'icon-dna1' },
    { title: t('character.creator.hair'), component: Hair, icon: 'icon-hair' },
    { title: t('character.creator.eyes'), component: Eyes, icon: 'icon-eye' },
    { title: 'Features', component: Dna, icon: 'icon-face' },
    { title: 'Appearance', component: Dna, icon: 'icon-makeup' },
    { title: 'Shirt', component: Dna, icon: 'icon-shirt' },
    { title: 'Pants', component: Dna, icon: 'icon-trousers' },
    { title: 'Shoes', component: Dna, icon: 'icon-boots' },
    { title: 'Hat', component: Dna, icon: 'icon-winter-hat' },
    { title: 'Accesories', component: Dna, icon: 'icon-watch' },
];

const { internal, setInternal, appearance, setAppearance } = useStore();

keys.onKeyUp('Tab', () => {
    if (internal.modalOpen) return;
    let index = internal.navIndex;
    index += 1;
    if (index > navigationItems.length - 1) index = 0;
    setInternal('navIndex', index);

    audio.play('/sounds/select.ogg');
});
</script>
<template>
    <SidePanel class="gap-6 px-10">
        <div class="w-full text-center text-5xl font-bold">{{ t('character.creator.title') }}</div>

        <div class="flex w-full items-center gap-3">
            <div class="whitespace-nowrap text-2xl font-bold">{{ t('character.creator.sex') }}:</div>
            <Button
                class="flex w-full justify-center gap-2"
                @click="setAppearance('sex', 1)"
                :type="appearance.sex === 1 ? 'primary' : 'secondary'"
            >
                <Icon icon="icon-male" />
                <div>{{ t('character.creator.male') }}</div>
            </Button>
            <Button
                class="flex w-full justify-center gap-2"
                @click="setAppearance('sex', 0)"
                :type="appearance.sex === 0 ? 'primary' : 'secondary'"
            >
                <div>{{ t('character.creator.female') }}</div>
                <Icon icon="icon-female" />
            </Button>
        </div>

        <div class="flex w-full items-center gap-2">
            <div class="grid grid-cols-5 gap-2">
                <template v-for="(item, index) of navigationItems">
                    <Button
                        :type="internal.navIndex === index ? 'primary' : 'secondary'"
                        @click="setInternal('navIndex', index)"
                        class="relative aspect-[3/4] p-6"
                    >
                        <div class="absolute bottom-px left-0 w-full text-center text-sm">{{ item.title }}</div>
                        <Icon :icon="item.icon" :size="4" class="-mt-2"></Icon>
                    </Button>
                </template>
            </div>
        </div>

        <div class="flex w-full gap-2">
            <Button class="flex w-full justify-center gap-2" type="secondary" @click="console.log('back')">
                <Icon icon="icon-back" />
                <div>{{ t('character.creator.back') }}</div>
            </Button>
            <Button class="flex w-full justify-center gap-2" @click="console.log('save')">
                <div>{{ t('character.creator.save') }}</div>
                <Icon icon="icon-check2" />
            </Button>
        </div>

        <div class="mt-10 flex w-full items-center justify-center gap-2">
            <div>{{ t('character.creator.use') }}</div>
            <div class="rounded border border-white bg-neutral-600 px-2">TAB</div>
            <div>{{ t('character.creator.to.navigate') }}</div>
        </div>
    </SidePanel>
    <div class="ml-3 flex w-[40rem] justify-center">
        <component :is="navigationItems[internal.navIndex].component" />
    </div>
</template>
