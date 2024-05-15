import { Appearance } from '@Shared/types/appearance.js';
import { ref, toRaw } from 'vue';
import { DefaultAppearance, initialInternal } from '../../shared/defaultAppearance.js';
import { useEvents } from '@Composables/useEvents.js';
import { CharacterCreatorEvents } from '../../shared/events.js';
import { IInternal } from '../../shared/interfaces.js';

const events = useEvents();

const appearance = ref<Appearance>(toRaw(DefaultAppearance));
const internal = ref<IInternal>(toRaw(initialInternal));

export function useStore() {
    function setAppearance<T extends keyof Appearance>(key: T, value: Appearance[T]) {
        if (key === 'sex') {
            if (value === appearance.value.sex) return;
            appearance.value = toRaw(DefaultAppearance);
            internal.value = toRaw(initialInternal);

            appearance.value[key] = value;

            Object.keys(appearance.value).forEach((_key) => {
                events.emitServer(CharacterCreatorEvents.toServer.updateAppearance, _key, appearance.value[_key]);
            });

            return;
        }
        appearance.value[key] = value;
        events.emitServer(CharacterCreatorEvents.toServer.updateAppearance, key, toRaw(value));
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
