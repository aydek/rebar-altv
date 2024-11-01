export type ICompassData = {
    heading: number;
    street: string;
    crossing: string;
    area: string;
};

export type ISpeedoData = {
    show: boolean;
    engine: boolean;
    locked: boolean;
    units: string;
    type: string;
    gear: string;
    speed: number;
    lights: number;
    belt: boolean;
    mileage: number;
    fuel: number;
    tank: number;
    rpm: number;
};

// export type IHudData = {
//     showSpeedometer: boolean;
//     vehicleType: string;
//     vehicleUnits: string;
//     engine: boolean;
//     fuel: number;
//     tank: number;
//     lock: boolean;
//     belt: boolean;
//     mileage: number;
//     speed: number;
//     gear: string;
//     rpm: number;
//     lights: number;
// };

// { key: 'hidden', value: false },
// { key: 'type', value: isElectric ? 'electric' : 'gas' },
// { key: 'units', value: units },
// { key: 'engine', value: veh.engineOn },

// { key: 'fuel', value: fuel },
// { key: 'tank', value: 100 },

// { key: 'lock', value: false },
// { key: 'belt', value: false },

// { key: 'mileage', value: mileage.toFixed(0) },
// { key: 'speed', value: realSpeed },
// { key: 'gear', value: realGear },
// { key: 'rpm', value: rpm },
// { key: 'lights', value: lightState },
