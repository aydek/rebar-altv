import { Appearance } from '@Shared/types/appearance.js';
import { ref } from 'vue';
import { DefaultAppearance } from '../shared/defaultAppearance.js';
import { useEvents } from '@Composables/useEvents.js';
import { CharacterCreatorEvents } from '../shared/events.js';
import { IInternal, initialInternal } from './const/internalStateDefault.js';

const events = useEvents();

const appearance = ref<Appearance>(JSON.parse(JSON.stringify(DefaultAppearance)));
const internal = ref<IInternal>(JSON.parse(JSON.stringify(initialInternal)));

export function useStore() {
    function setAppearance<T extends keyof Appearance>(key: T, value: Appearance[T]) {
        if (key === 'sex') {
            if (value === appearance.value.sex) return;

            for (const _key in DefaultAppearance) {
                appearance.value[_key] = DefaultAppearance[_key];
            }

            for (const _key in initialInternal) {
                internal.value[_key] = initialInternal[_key];
            }

            appearance.value[key] = value;

            console.log(appearance.value);

            for (const _key in appearance.value) {
                events.emitServer(CharacterCreatorEvents.toServer.updateAppearance, _key, appearance.value[_key]);
            }

            return;
        }
        appearance.value[key] = value;
        events.emitServer(CharacterCreatorEvents.toServer.updateAppearance, key, JSON.parse(JSON.stringify(value)));
    }

    function setInternal<T extends keyof IInternal>(key: T, value: IInternal[T]) {
        internal.value[key] = value;
    }

    return {
        internal: internal.value,
        appearance: appearance.value,
        setAppearance,
        setInternal,
    };
}
