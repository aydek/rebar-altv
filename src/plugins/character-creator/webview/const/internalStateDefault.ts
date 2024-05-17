export interface IInternal {
    navIndex: number;
    modalOpen: boolean;
    motherIndex: number;
    fatherIndex: number;
    hairIndex: number;
    shoesIndex: number;
    legsIndex: number;
    topsIndex: number;
    hatIndex: number;
    watchIndex: number;
    braceletIndex: number;
    earingIndex: number;
    glassesIndex: number;
    undershirtIndex: number;
}

export const initialInternal: IInternal = {
    navIndex: 0,
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
