import { ref } from 'vue';
import { ICompassData, ISpeedoData } from '../shared/types.js';
import { altInWindow } from '@Composables/altInWindow.js';

const compass = ref<ICompassData>({
    heading: 0,
    street: 'Palomino ave',
    crossing: '/ Power st',
    area: 'Pilbox hill',
});

const speedo = ref<ISpeedoData>({
    show: !altInWindow(),
    units: 'KM/H',
    type: 'gas',
    belt: false,
    engine: !altInWindow(),
    locked: false,
    fuel: 100,
    gear: 'N',
    lights: 0,
    mileage: 0,
    rpm: 0,
    speed: 0,
    tank: 100,
});

export function useStore() {
    function setCompass<K extends keyof ICompassData>(items: Array<{ key: K; value: ICompassData[K] }>) {
        for (const item of items) {
            compass.value[item.key] = item.value;
        }
    }

    function setSpeedo<K extends keyof ISpeedoData>(items: Array<{ key: K; value: ISpeedoData[K] }>) {
        for (const item of items) {
            speedo.value[item.key] = item.value;
        }
    }

    return {
        compass: compass.value,
        setCompass,
        speedo: speedo.value,
        setSpeedo,
    };
}
