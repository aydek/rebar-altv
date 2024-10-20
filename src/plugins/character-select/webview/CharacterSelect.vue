<script setup lang="ts">
import SidePanel from '@Components/SidePanel.vue';
import Button from '@Components/Button.vue';
import Icon from '@Components/Icon.vue';
import CharDelete from './components/Delete.vue';
import '../translate/index';
import { useTranslate } from '@Shared/translate';
import { useEvents } from '@Composables/useEvents';
import { Character } from '@Shared/types';
import { onMounted, ref } from 'vue';
import { CharacterSelectEvents } from '../shared/events';

const { t } = useTranslate();
const events = useEvents();

const loading = ref('alt' in window);
const selectIndex = ref(0);
const isDeleting = ref(false);
const characters = ref<Character[]>(
    'alt' in window
        ? []
        : [
              { account_id: 'a', cash: 5000, name: 'Jonas Valanciunas', hours: 4000 },
              { account_id: 'a', cash: 532, name: 'Jonas sdd', hours: 50000 },
              { account_id: 'a', cash: 5054200, name: 'Jonas 2231', hours: 50000 },
              { account_id: 'a', cash: 50553200, name: 'Jonas Valanddasaciunas', hours: 50000 },
              { account_id: 'a', cash: 5033300, name: 'Jonas Valandeeeciunas', hours: 50000 },
          ],
);

function setIndex(index: number) {
    if (loading.value) return;
    selectIndex.value = index;
    events.emitServer(CharacterSelectEvents.toServer.syncAppearance, index);
}

function handleCharacters(data: Character[]) {
    characters.value = data;
    loading.value = false;
    events.emitServer(CharacterSelectEvents.toServer.syncAppearance, selectIndex.value);
}

function handlePlay() {
    if (loading.value) return;
    loading.value = true;
    events.emitServer(CharacterSelectEvents.toServer.handlePlay, selectIndex.value);
}

function openCreator() {
    if (loading.value) return;
    loading.value = true;
    events.emitServer(CharacterSelectEvents.toServer.openCreator);
}

function toggleDelete() {
    isDeleting.value = true;
    loading.value = true;
}

function doNotDelete() {
    isDeleting.value = false;
    loading.value = false;
}

function deleteCharacterForSure() {
    loading.value = true;
    isDeleting.value = false;
    events.emitServer(CharacterSelectEvents.toServer.delete, selectIndex.value);
}

onMounted(() => {
    events.on(CharacterSelectEvents.toWebview.setCharacters, handleCharacters);
});
</script>

<template>
    <SidePanel class="font-bold">
        <div v-if="!isDeleting">
            <div class="mb-20 w-full text-center text-5xl font-bold">{{ t('character.select.title') }}</div>

            <div v-if="!characters.length">{{ t('character.select.not.found') }}...</div>

            <div class="w-full" v-if="characters.length">
                <div class="mb-10 text-5xl" style="word-spacing: 100vw">
                    {{ characters[selectIndex].name }}
                </div>
                <div class="flex w-full space-x-2">
                    <div class="text-neutral-500">{{ t('character.select.cash') }}:</div>
                    <div class="text-accent-600">{{ characters[selectIndex].cash }} $</div>
                </div>

                <div class="flex w-full space-x-2">
                    <div class="text-neutral-500">{{ t('character.select.played') }}:</div>
                    <div class="text-accent-600">{{ (characters[selectIndex].hours / 60 / 60).toFixed() }} h</div>
                </div>

                <div class="mt-10 flex w-full flex-col gap-2">
                    <Button
                        :type="loading ? 'disabled' : 'primary'"
                        class="flex items-center justify-center"
                        v-if="characters.length"
                        @click="handlePlay"
                    >
                        <div>{{ t('character.select.play') }}</div>
                        <Icon :size="2" icon="icon-play-button" class="translate-x-3 translate-y-0.5"></Icon>
                    </Button>

                    <Button
                        :type="loading ? 'disabled' : 'secondary'"
                        class="flex items-center justify-center"
                        v-if="characters.length"
                        @click="toggleDelete"
                    >
                        <div>{{ t('character.select.delete') }}</div>
                        <Icon :size="2" icon="icon-trash1" class="translate-x-3 translate-y-0.5"></Icon>
                    </Button>
                </div>
            </div>

            <div class="mt-10 grid w-full grid-cols-3 gap-4">
                <div v-for="(item, index) in Array(6)">
                    <Button
                        v-if="index < characters.length"
                        :type="loading ? 'disabled' : selectIndex === index ? 'primary' : 'secondary'"
                        @click="setIndex(index)"
                        class="grid aspect-square place-items-center"
                    >
                        <Icon :size="4" icon="icon-user" />
                    </Button>

                    <Button
                        v-if="index >= characters.length"
                        type="disabled"
                        class="grid aspect-square place-items-center"
                    >
                        <Icon :size="4" icon="icon-add-user" />
                    </Button>
                </div>
            </div>

            <Button
                :type="loading ? 'disabled' : 'primary'"
                class="mt-10 w-full"
                v-if="characters.length < 6"
                @click="openCreator"
                >{{ t('character.select.create.new') }}</Button
            >
        </div>
        <CharDelete
            @yes_delete="deleteCharacterForSure"
            @no_delete="doNotDelete"
            :name="characters[selectIndex].name"
            v-else
        />
    </SidePanel>
</template>
