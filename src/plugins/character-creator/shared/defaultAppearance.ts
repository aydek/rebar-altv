import { ClothingKey, PropKey } from '@Shared/data/clothing.js';
import { Appearance } from '@Shared/types/appearance.js';
import { ClothingComponent } from '@Shared/types/clothingComponent.js';
import { IInternal } from './interfaces.js';

export const initialInternal: IInternal = {
    primaryNav: 0,
    secondaryNav: 0,
    modalOpen: false,
    motherIndex: 0,
    fatherIndex: 0,
    hairIndex: 0,
    shoesIndex: 0,
    legsIndex: 0,
    topsIndex: 0,
    hatIndex: 0,
    watchIndex: 0,
    braceletIndex: 0,
    earingIndex: 0,
    glassesIndex: 0,
    undershirtIndex: 0,
};

export const DefaultAppearance: Appearance = {
    sex: 1,
    faceFather: 0,
    faceMother: 0,
    faceMix: 0.5,
    skinFather: 0,
    skinMother: 0,
    skinMix: 0.5,
    eyes: 0,
    eyebrows: 0,
    eyebrowsOpacity: 1,
    eyebrowsColor1: 0,
    chestHair: 0,
    chestHairOpacity: 0,
    chestHairColor1: 0,
    facialHair: 0,
    facialHairOpacity: 0,
    facialHairColor1: 0,
    hair: 0,
    hairColor1: 0,
    hairColor2: 0,
    headOverlays: [
        { id: 0, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 3, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 4, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 5, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 6, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 7, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 8, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 9, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 10, opacity: 0, color1: 0, color2: 0, value: 0 },
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
