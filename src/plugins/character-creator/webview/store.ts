import { Appearance } from '@Shared/types/appearance.js';
import { ref } from 'vue';
import { DefaultAppearance } from '../shared/defaultAppearance.js';
import { useEvents } from '@Composables/useEvents.js';
import { CharacterCreatorEvents } from '../shared/events.js';
import { IInternal, initialInternal } from './const/internalStateDefault.js';
import { ClothingItemData } from '@Shared/data/clothingNames/clothingNames.js';

const events = useEvents();

const appearance = ref<Appearance>(JSON.parse(JSON.stringify(DefaultAppearance)));
const internal = ref<IInternal>(JSON.parse(JSON.stringify(initialInternal)));

export function useStore() {
    function resetStore() {
        for (const _key in DefaultAppearance) {
            appearance.value[_key] = DefaultAppearance[_key];
        }

        for (const _key in initialInternal) {
            internal.value[_key] = initialInternal[_key];
        }
    }

    function setClothes(isProp: boolean, id: number, data: ClothingItemData) {
        events.emitClient(CharacterCreatorEvents.toClient.updateClothes, isProp, id, data);
    }

    function setAppearance<T extends keyof Appearance>(key: T, value: Appearance[T]) {
        if (key === 'sex') {
            if (value === appearance.value.sex) return;

            useStore().resetStore();

            events.emitClient(CharacterCreatorEvents.toClient.resetClothes);
            events.emitClient(CharacterCreatorEvents.toClient.setCamera, 0);

            appearance.value[key] = value;

            for (const _key in appearance.value) {
                events.emitClient(
                    CharacterCreatorEvents.toClient.updateAppearance,
                    _key,
                    JSON.parse(JSON.stringify(appearance.value[_key])),
                );
            }

            return;
        }
        appearance.value[key] = value;
        events.emitClient(CharacterCreatorEvents.toClient.updateAppearance, key, JSON.parse(JSON.stringify(value)));
    }

    function setInternal<T extends keyof IInternal>(key: T, value: IInternal[T]) {
        if (key === 'navIndex') {
            events.emitClient(CharacterCreatorEvents.toClient.setCamera, value);
        }
        internal.value[key] = value;
    }

    return {
        internal: internal.value,
        appearance: appearance.value,
        setAppearance,
        setInternal,
        setClothes,
        resetStore,
    };
}
