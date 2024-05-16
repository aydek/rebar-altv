/**
 * dlc information for given clothing data
 */
export type ClothingComponent = {
    /**
     * The component identifier
     *
     * @type {number}
     *
     */
    id: number;

    /**
     * The associated relative drawing id for a given dlc clothing component
     *
     * @type {number}
     *
     */
    drawable: number;

    /**
     *
     *
     * @type {number}
     *
     */
    texture: number;

    /**
     *
     *
     * @type {number}
     *
     */
    palette?: number;

    /**
     *
     *
     * @type {number}
     *
     */
    dlc: number;

    /**
     *
     *
     * @type {boolean}
     *
     */
    isProp?: boolean;
};

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
