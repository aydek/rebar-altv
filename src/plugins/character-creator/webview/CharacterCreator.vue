<script setup lang="ts">
import { ref } from 'vue';
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import Dna from './components/Dna.vue';
import { useStore } from './store/store';
import '../translate/index';
import { useTranslate } from '@Shared/translate';

const primaryNav = [
    { title: 'Dna', component: Dna, icon: 'icon-dna1' },
    { title: 'Hair', component: Dna, icon: 'icon-hair' },
    { title: 'Eyes', component: Dna, icon: 'icon-eye' },
    { title: 'Features', component: Dna, icon: 'icon-face' },
    { title: 'Appearance', component: Dna, icon: 'icon-makeup' },
];

const secondaryNav = [
    { title: 'Shirt', component: Dna, icon: 'icon-shirt' },
    { title: 'Pants', component: Dna, icon: 'icon-trousers' },
    { title: 'Shoes', component: Dna, icon: 'icon-boots' },
    { title: 'Hat', component: Dna, icon: 'icon-winter-hat' },
    { title: 'Accesories', component: Dna, icon: 'icon-watch' },
];

const { internal, setInternal } = useStore();

const { t } = useTranslate();
</script>
<template>
    <SidePanel class="p-0 pl-5">
        <div class="mb-20 w-full text-center text-5xl font-bold">{{ t('character.creator.title') }}</div>
        <div class="flex w-full gap-2">
            <div class="flex flex-col gap-3">
                <template v-for="(item, index) of primaryNav">
                    <Button
                        :type="internal.primaryNav === index ? 'primary' : 'secondary'"
                        @click="setInternal('primaryNav', index)"
                        class="relative aspect-square p-6"
                    >
                        <div class="absolute bottom-px left-0 w-full text-center text-sm">{{ item.title }}</div>
                        <Icon :icon="item.icon" :size="4" class="-mt-2"></Icon>
                    </Button>
                </template>
            </div>
            <div class="ml-3 flex w-full justify-center">
                <component :is="primaryNav[internal.primaryNav].component" />
            </div>
        </div>
        <div class="mt-20 flex w-full gap-2">
            <Button class="flex w-full justify-center gap-2" type="secondary" @click="console.log('back')">
                <Icon icon="icon-back" />
                <div>{{ t('character.creator.back') }}</div>
            </Button>
            <Button class="flex w-full justify-center gap-2" @click="console.log('save')">
                <div>{{ t('character.creator.save') }}</div>
                <Icon icon="icon-check2" />
            </Button>
        </div>
    </SidePanel>
    <SidePanel position="right" class="p-0 pr-5">
        <div class="flex w-full gap-2">
            <div class="mr-3 flex w-full justify-center">
                <component :is="secondaryNav[internal.secondaryNav].component" />
            </div>
            <div class="flex flex-col gap-3">
                <template v-for="(item, index) of secondaryNav">
                    <Button
                        :type="internal.secondaryNav === index ? 'primary' : 'secondary'"
                        @click="setInternal('secondaryNav', index)"
                        class="relative aspect-square p-6"
                    >
                        <div class="absolute bottom-px left-0 w-full text-center text-sm">{{ item.title }}</div>
                        <Icon :icon="item.icon" :size="4" class="-mt-2"></Icon>
                    </Button>
                </template>
            </div>
        </div>
    </SidePanel>
</template>
