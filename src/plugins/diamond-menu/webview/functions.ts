export function getCordinates(index: number, gap: number) {
    if (index === 0) return { x: 0, y: 0 };

    let layer = 1;
    let itemsInPreviousLayers = 0;
    let itemsPerLayer = 4;

    // Keep incrementing layers and calculate how many items are covered up to the current layer
    while (index > itemsInPreviousLayers + itemsPerLayer) {
        itemsInPreviousLayers += itemsPerLayer;
        layer++;

        // Increase the number of items per layer for higher layers
        if (layer > 2) {
            if (!dividable(layer, 2)) itemsPerLayer = 8;
            else itemsPerLayer = 6;
        }
    }
    const addedgap = gap * layer;

    const order = index - itemsInPreviousLayers;

    let x = 0;
    let y = 0;


    if (layer < 3 && !dividable(layer, 2)) {
        if (order === 1) return { x: -addedgap, y: -addedgap };
        if (order === 2) return { x: addedgap, y: -addedgap };
        if (order === 3) return { x: -addedgap, y: addedgap };
        if (order === 4) return { x: addedgap, y: addedgap };
    }

    if (layer < 3 && dividable(layer, 2)) {
        if (order === 1) return { x: 0, y: -addedgap };
        if (order === 2) return { x: addedgap, y: 0 };
        if (order === 3) return { x: 0, y: addedgap };
        if (order === 4) return { x: -addedgap, y: 0 };
    }

    if (!dividable(layer, 2)) {
        if (order === 1) return { x: -addedgap + gap, y: -gap * 2 };
        if (order === 2) return { x: addedgap - gap, y: -gap * 2 };
        if (order === 3) return { x: addedgap - gap, y: gap * 2 };
        if (order === 4) return { x: -addedgap + gap, y: gap * 2 };
        if (order === 5) return { x: -addedgap, y: -gap };
        if (order === 6) return { x: addedgap, y: -gap };
        if (order === 7) return { x: addedgap, y: gap };
        if (order === 8) return { x: -addedgap, y: gap };
    }

    if (dividable(layer, 2)) {
        if (order === 1) return { x: -addedgap + gap, y: -gap * 2 - gap };
        if (order === 2) return { x: addedgap - gap, y: -gap * 2 - gap };
        if (order === 3) return { x: addedgap, y: 0 };
        if (order === 4) return { x: addedgap - gap, y: gap * 2 + gap };
        if (order === 5) return { x: -addedgap + gap, y: gap * 2 + gap };
        if (order === 6) return { x: -addedgap, y: 0 };
    }

    return { x, y };
}

function dividable(val: number, by: number) {
    return val % by === 0;
}
