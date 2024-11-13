<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { useStore } from '../store';

import Icon from '@Components/Icon.vue';
import { useLocalStorage } from '@Composables/useLocalStorage';
import { HudSettingsKeys } from '@Plugins/hud/shared/settings';
import { onMounted, ref } from 'vue';

const store = useStore();
const storage = useLocalStorage();
const speedHidden = ref(true);

function formatNumberWithZeros(number: number) {
    const formattedNumber = String(number).padStart(3, '0');
    return formattedNumber[0] + formattedNumber[1] + formattedNumber[2];
}

function formatMileage(number: number) {
    const fnumber = String(number).padStart(7, '0');
    return [fnumber[0], fnumber[1], fnumber[2], fnumber[3], fnumber[4], fnumber[5], fnumber[6]];
}

onMounted(async () => {
    speedHidden.value = await storage.get(HudSettingsKeys.speedoHidden);
});
</script>

<template>
    <div :class="twMerge('fixed bottom-14 right-8  opacity-0 transition-opacity', speedHidden ? 'opacity-0' : store.speedo.show && 'opacity-100')">
        <div
            :class="
                twMerge(
                    'absolute left-0 top-0 mt-10 flex h-full w-full flex-col items-center justify-center opacity-0 transition-opacity',
                    store.speedo.engine && 'opacity-100',
                )
            "
        >
            <div class="relative mb-2 flex w-full items-end justify-center gap-1 pl-8">
                <div class="text-shadow line text-7xl font-bold">{{ formatNumberWithZeros(store.speedo.speed) }}</div>
                <div class="text-shadow mb-1 font-bold">{{ store.speedo.units }}</div>
            </div>
            <div class="text-shadow mb-2 flex gap-4 text-neutral-300">
                <Icon icon="icon-low-beam" :size="1.7" v-if="store.speedo.lights === 0" />
                <Icon icon="icon-low-beam" :size="1.7" class="text-green-800" v-if="store.speedo.lights === 1" />
                <Icon icon="icon-high-beam" :size="1.7" class="text-blue-800" v-if="store.speedo.lights === 2" />
                <Icon icon="icon-lock1" :size="1.7" class="text-green-800" v-if="store.speedo.locked" />
                <Icon icon="icon-unlock-alt" :size="1.7" v-if="!store.speedo.locked" />
                <Icon icon="icon-seatbelt-fill" :size="1.7" :class="store.speedo.belt && 'text-green-800'" />
            </div>
            <div class="flex divide-x rounded-md border border-neutral-300 bg-neutral-900">
                <div v-if="store.speedo.units !== 'KN'" class="px-0.5 text-center text-base" v-for="item of formatMileage(store.speedo.mileage)">
                    {{ item }}
                </div>
            </div>
        </div>
        <svg class="absolute -right-3 bottom-[0.85rem] transition-all" xmlns="http://www.w3.org/2000/svg" width="2rem" viewBox="0 0 19 87" fill="none">
            <path
                d="M2.56429 84.6693C10.6826 72.5506 15.3331 58.4428 16.0126 43.872C16.6922 29.3011 13.3751 14.8218 6.42001 2"
                class="stroke-neutral-600"
                stroke-width="4"
            />
            <path
                d="M2.56429 84.6693C10.6826 72.5506 15.3331 58.4428 16.0126 43.872C16.6922 29.3011 13.3751 14.8218 6.42001 2"
                :class="twMerge(store.speedo.fuel > 10 ? (store.speedo.type === 'electric' ? 'stroke-[#0077ff]' : 'stroke-[#ffae00]') : 'stroke-red-900')"
                stroke-width="4"
                stroke-dasharray="90"
                :stroke-dashoffset="store.speedo.engine ? 90 - (90 * store.speedo.fuel) / store.speedo.tank : 90"
            />
        </svg>
        <Icon icon="icon-local_gas_station" :size="1.3" v-if="store.speedo.type === 'gas'" class="absolute -bottom-1 right-3 h-auto" />
        <Icon icon="icon-electric" :size="1.3" v-if="store.speedo.type === 'electric'" class="absolute -bottom-1 right-3 h-auto" />

        <svg xmlns="http://www.w3.org/2000/svg" width="16rem" viewBox="-5 -5 152 131" fill="none" class="transition-all">
            <path
                d="M21.5026 120.497C11.7129 110.708 5.04603 98.235 2.34506 84.6563C-0.355904 71.0776 1.03033 57.003 6.32846 44.2122C11.6266 31.4213 20.5987 20.4888 32.1101 12.7971C43.6216 5.10543 57.1553 1 71 1C84.8447 1 98.3785 5.10543 109.89 12.7971C121.401 20.4888 130.373 31.4213 135.672 44.2122C140.97 57.003 142.356 71.0777 139.655 84.6563C136.954 98.235 130.287 110.708 120.498 120.497"
                class="stroke-neutral-600"
                stroke-width="6"
            />
            <path
                d="M21.5026 120.497C11.7129 110.708 5.04603 98.235 2.34506 84.6563C-0.355904 71.0776 1.03033 57.003 6.32846 44.2122C11.6266 31.4213 20.5987 20.4888 32.1101 12.7971C43.6216 5.10543 57.1553 1 71 1C84.8447 1 98.3785 5.10543 109.89 12.7971C121.401 20.4888 130.373 31.4213 135.672 44.2122C140.97 57.003 142.356 71.0777 139.655 84.6563C136.954 98.235 130.287 110.708 120.498 120.497"
                class="stroke-[#9185BE]"
                stroke-width="6"
                :stroke-dasharray="330"
                :stroke-dashoffset="store.speedo.engine ? 330 - (330 * (store.speedo.rpm * 100)) / 100 : 330"
            />
        </svg>
    </div>
</template>
