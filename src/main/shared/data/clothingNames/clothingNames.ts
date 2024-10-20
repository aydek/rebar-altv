import { ClothingKey, PropKey } from '../clothingKeys.js';

import maleAccesories from '@Shared/data/clothingNames/maleAccesories.json';
import femaleAccesories from '@Shared/data/clothingNames/femaleAccesories.json';
import maleBracelets from '@Shared/data/clothingNames/maleBracelets.json';
import femaleBracelets from '@Shared/data/clothingNames/femaleBracelets.json';
import maleEars from '@Shared/data/clothingNames/maleEars.json';
import femaleEars from '@Shared/data/clothingNames/femaleEars.json';
import maleGlasses from '@Shared/data/clothingNames/maleGlasses.json';
import femaleGlasses from '@Shared/data/clothingNames/femaleGlasses.json';
import maleHats from '@Shared/data/clothingNames/maleHats.json';
import femaleHats from '@Shared/data/clothingNames/femaleHats.json';
import maleLegs from '@Shared/data/clothingNames/maleLegs.json';
import femaleLegs from '@Shared/data/clothingNames/femaleLegs.json';
import maleMasks from '@Shared/data/clothingNames/maleMasks.json';
import femaleMasks from '@Shared/data/clothingNames/femaleMasks.json';
import maleShoes from '@Shared/data/clothingNames/maleShoes.json';
import femaleShoes from '@Shared/data/clothingNames/femaleShoes.json';
import maleTops from '@Shared/data/clothingNames/maleTops.json';
import femaleTops from '@Shared/data/clothingNames/femaleTops.json';
import maleTorsos from '@Shared/data/clothingNames/maleTorsos.json';
import femaleTorsos from '@Shared/data/clothingNames/femaleTorsos.json';
import maleUndershirts from '@Shared/data/clothingNames/maleUndershirts.json';
import femaleUndershirts from '@Shared/data/clothingNames/femaleUndershirts.json';
import maleWatches from '@Shared/data/clothingNames/maleWatches.json';
import femaleWatches from '@Shared/data/clothingNames/femaleWatches.json';

export interface ClothingItemData {
    id: number;
    drawable: number;
    dlc: string;
    texture: number;
    name: string;
}

export interface ClothingTopItemData extends ClothingItemData {
    combos: Array<{
        undershirt: number;
        torso: number;
        armour: number;
    }>;
}

function getFullList(sex: number, isProp: boolean, key: number): ClothingItemData[] | ClothingTopItemData[] {
    if (isProp) {
        if (key === PropKey.hat) return sex === 1 ? maleHats : femaleHats;
        if (key === PropKey.bracelet) return sex === 1 ? maleBracelets : femaleBracelets;
        if (key === PropKey.ears) return sex === 1 ? maleEars : femaleEars;
        if (key === PropKey.glasses) return sex === 1 ? maleGlasses : femaleGlasses;
        if (key === PropKey.watch) return sex === 1 ? maleWatches : femaleWatches;
    } else {
        if (key === ClothingKey.legs) return sex === 1 ? maleLegs : femaleLegs;
        if (key === ClothingKey.shoes) return sex === 1 ? maleShoes : femaleShoes;
        if (key === ClothingKey.accessories) return sex === 1 ? maleAccesories : femaleAccesories;
        if (key === ClothingKey.mask) return sex === 1 ? maleMasks : femaleMasks;
        if (key === ClothingKey.tops) return sex === 1 ? maleTops : femaleTops;
        if (key === ClothingKey.torso) return sex === 1 ? maleTorsos : femaleTorsos;
        if (key === ClothingKey.undershirts) return sex === 1 ? maleUndershirts : femaleUndershirts;
    }
    return [];
}

export function getAllDlcs(sex: number, isProp: boolean, key: number): string[] {
    let data: ClothingItemData[] = getFullList(sex, isProp, key);
    if (!data.length) return [];
    return data.map((item) => item.dlc);
}

export function getClothingName(sex: number, isProp: boolean, key: number, dlc: string, drawable: number): string {
    let data: ClothingItemData[] = getFullList(sex, isProp, key);

    if (!data.length) return 'None';

    const item = data.find((i) => i.dlc === dlc && i.drawable === drawable);

    if (!item) return 'None';

    return item.name;
}

export function getListFromDlc(
    sex: number,
    isProp: boolean,
    key: number,
    dlcs: string[] | 'all',
    exclude?: string[],
): ClothingItemData[] | ClothingTopItemData[] {
    let data: any = getFullList(sex, isProp, key);

    if (!data.length) return [];

    const items = data.filter((item) => {
        const dlcIncluded = dlcs.includes(item.dlc) || dlcs === 'all';

        const shouldExclude =
            Array.isArray(exclude) && exclude.length > 0
                ? !exclude.some((partName) => item.name.includes(partName))
                : true;

        return dlcIncluded && shouldExclude;
    });
    if (key !== ClothingKey.undershirts && key !== ClothingKey.torso) {
        items.unshift(getNoneItem(sex, isProp, key));
    }

    return items;
}

function getNoneItem(sex: number, isProp: boolean, key: number) {
    if (isProp)
        return {
            id: key,
            drawable: -1,
            dlc: '',
            name: 'None',
            texture: 0,
        };

    if (key === ClothingKey.tops && sex === 1)
        return {
            id: key,
            drawable: 15,
            dlc: '',
            name: 'None',
            texture: 0,
            combos: [{ undershirt: 152, torso: 15, armour: 5 }],
        };
    if (key === ClothingKey.tops && sex === 0)
        return {
            id: key,
            drawable: 15,
            dlc: '',
            name: 'None',
            texture: 0,
            combos: [{ undershirt: 33, torso: 15, armour: 1 }],
        };
    if (key === ClothingKey.legs )
        return {
            id: key,
            drawable: 14,
            dlc: '',
            name: 'None',
            texture: 0,
        };

    if ( key === ClothingKey.shoes)
        return {
            id: key,
            drawable: 5,
            dlc: '',
            name: 'None',
            texture: 0,
        };

    return {};
}
