import { ClothingKey, PropKey } from '@Shared/data/clothing.js';
import { Appearance } from '@Shared/types/appearance.js';
import { ClothingComponent } from '@Shared/types/clothingComponent.js';

export const DefaultAppearance: Appearance = {
    sex: 1,
    faceFather: 0,
    faceMother: 21,
    faceMix: 0.5,
    skinFather: 0,
    skinMother: 21,
    skinMix: 0.5,
    eyes: 0,
    eyebrows: 34,
    eyebrowsOpacity: 1,
    eyebrowsColor1: 0,
    chestHair: 17,
    chestHairOpacity: 1,
    chestHairColor1: 0,
    facialHair: 29,
    facialHairOpacity: 1,
    facialHairColor1: 0,
    hair: 0,
    hairColor1: 0,
    hairColor2: 0,
    headOverlays: [
        { id: 0, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 3, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 4, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 5, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 6, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 7, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 8, opacity: 1, color1: 0, color2: 0, value: -1 },
        { id: 9, opacity: 1, color1: 0, color2: 0, value: -1 },
    ],
    structure: new Array(20).fill(0),
    hairDlc: 0,
    hairOverlay: { collection: '', overlay: '' },
    tattoos: [],
};

export const DefaultClothes: Array<ClothingComponent> = [
    /** Props */
    { id: PropKey.watch, dlc: 0, drawable: -1, texture: 0, palette: 0, isProp: true },
    { id: PropKey.bracelet, dlc: 0, drawable: -1, texture: 0, palette: 0, isProp: true },
    { id: PropKey.ears, dlc: 0, drawable: -1, texture: 0, palette: 0, isProp: true },
    { id: PropKey.hat, dlc: 0, drawable: -1, texture: 0, palette: 0, isProp: true },
    { id: PropKey.glasses, dlc: 0, drawable: -1, texture: 0, palette: 0, isProp: true },
    /** Clothes */
    { id: ClothingKey.mask, dlc: 0, drawable: 0, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.armour, dlc: 0, drawable: 0, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.bag, dlc: 0, drawable: 0, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.legs, dlc: 0, drawable: 14, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.shoes, dlc: 0, drawable: 5, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.top, dlc: 0, drawable: 15, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.torso, dlc: 0, drawable: 15, texture: 0, palette: 0, isProp: false },
    { id: ClothingKey.undershirt, dlc: 0, drawable: 15, texture: 0, palette: 0, isProp: false },
];
