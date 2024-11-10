<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { INotification, NotificationTypes } from '../shared/types';
import { twMerge } from 'tailwind-merge';
import Icon from '@Components/Icon.vue';
import Button from '@Components/Button.vue';
import { altInWindow } from '@Composables/altInWindow';
import { notifyConfig } from '../shared/config';
import { colorify } from './colorfy';
import { useEvents } from '@Composables/useEvents';
import { notificationEvents } from '../shared/events';

interface WebNotification extends INotification {
    show: boolean;
    startTime: number;
    endTime: number;
    persistant: boolean;
}

const events = useEvents();

const notifications = ref<WebNotification[]>([]);

function pushNotification(message: string, type: NotificationTypes, time: number = notifyConfig.defaultTime, persistant: boolean = false) {
    notifications.value.push({
        type,
        message,
        show: false,
        startTime: Date.now(),
        endTime: Date.now() + time,
        persistant,
    });

    if (notifications.value.length >= notifyConfig.maxItems) {
        const index = notifications.value.findIndex((item) => !item.persistant && item.endTime > Date.now());
        if (index > -1) {
            notifications.value[index].endTime = Date.now() - 1000;
        }
    }
    setTimeout(() => {
        notifications.value.forEach((item) => {
            if (item.show && item.message !== message) return;
            item.show = true;
        });
    }, 50);
}

function clearNotification(search: string) {
    const index = notifications.value.findIndex((item) => item.message.includes(search));
    if (index > -1) {
        notifications.value[index].endTime = Date.now();
    }
}

onMounted(() => {
    events.on(notificationEvents.toWebview.show, pushNotification);
    events.on(notificationEvents.toWebview.clear, clearNotification);
    const interval = setInterval(() => {
        if (notifications.value.length < 1) {
            return;
        }
        notifications.value = notifications.value.filter((item) => item.endTime > Date.now() - 500);
    }, 100);
    onUnmounted(() => clearInterval(interval));
});

function getParams(item: INotification) {
    switch (item.type) {
        case 'info':
            return {
                icon: 'icon-info1',
                color: '#0099ff',
            };

        case 'bell':
            return {
                icon: 'icon-bell2',
                color: '#d4d4d4',
            };
        case 'error': {
            return {
                icon: 'icon-exclamation',
                color: '#990000',
            };
        }
        case 'success': {
            return {
                icon: 'icon-check',
                color: '#009900',
            };
        }

        case 'warning': {
            return {
                icon: 'icon-exclamation',
                color: '#d4d000',
            };
        }
        case 'bag': {
            return {
                icon: 'icon-backpack',
                color: '#a300c4',
            };
        }
        default:
            return {
                icon: 'icon-error',
                color: '#aa0000',
            };
    }
}

const getProgress = (endTime: number, startTime: number) => {
    const currentTime = Date.now();

    // If the end time is in the past, return 0 (completed)
    if (endTime <= currentTime) {
        return 384;
    }
    const timeLeft = endTime - currentTime;
    const totalTime = endTime - startTime;
    const progressBarValue = (1 - timeLeft / totalTime) * 384;
    return progressBarValue;
};

function testnotifications() {
    setTimeout(() => {
        pushNotification('This is a info messagea', 'info', 7000);
    }, 500);
    setTimeout(() => {
        pushNotification('This is a error messagebv{d4d000} very long message bla bla bla bla', 'error', 20000);
    }, 1000);
    setTimeout(() => {
        pushNotification('This is a bag messagec', 'bag', 9000);
    }, 1500);
    setTimeout(() => {
        pushNotification('This is a bell messaged', 'bell', 5000);
    }, 2000);
    setTimeout(() => {
        pushNotification('Persistant mesage success', 'success', 10000);
    }, 2500);
    setTimeout(() => {
        pushNotification('Persistant mesage warning', 'warning', 10000);
    }, 3000);
}
</script>

<template>
    <Button v-if="!altInWindow()" class="absolute left-2 top-2" @click="testnotifications">Test some stuff</Button>
    <Button v-if="!altInWindow()" class="absolute left-2 top-20" @click="clearNotification('bla bla')">Clear bla bla</Button>
    <div class="pointer-events-none absolute right-0 z-50 flex w-1/5 flex-col p-3">
        <div
            v-for="item of notifications"
            :key="item.message + item.endTime"
            :class="
                twMerge(
                    'my-1.5 flex h-20 items-center rounded-xl bg-neutral-900 bg-opacity-80 opacity-0 transition-all duration-300',
                    item.show && 'opacity-100',
                    item.endTime < Date.now() && '-my-10 translate-x-[150%]',
                )
            "
        >
            <div class="flex items-center justify-center" :style="{ color: getParams(item).color }">
                <Icon :icon="getParams(item).icon" class="absolute z-10" :size="1.3" />

                <div class="m-4 aspect-square w-10">
                    <svg viewBox="-1 -1 100 100" width="100%" height="100%" class="rotate-45">
                        <rect
                            x="1"
                            y="1"
                            width="96"
                            height="96"
                            rx="20"
                            :stroke="getParams(item).color"
                            stroke-width="10"
                            fill="#000000AA"
                            :style="{ filter: 'brightness(40%)' }"
                        />
                        <rect
                            x="1"
                            y="1"
                            width="96"
                            height="96"
                            rx="20"
                            :stroke="getParams(item).color"
                            class="transition-all"
                            stroke-width="10"
                            fill="none"
                            stroke-dasharray="384"
                            :stroke-dashoffset="getProgress(item.endTime, item.startTime)"
                        />
                    </svg>
                </div>
            </div>
            <div v-html="colorify(item.message)"></div>
        </div>
    </div>
</template>
