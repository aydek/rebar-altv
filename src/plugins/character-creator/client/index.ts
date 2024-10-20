import * as alt from 'alt-client';
import * as native from 'natives';
import { useClonedPed } from '@Client/ped/clone.js';
import { useWebview } from '@Client/webview/index.js';
import { Appearance } from '@Shared/types/appearance.js';

import { DefaultAppearance, DefaultClothes } from '../shared/defaultAppearance.js';
import { CharacterCreatorEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';
import { ClothingComponent } from '@Shared/types/clothingComponent.js';
import { useClientApi } from '@Client/api/index.js';

import '../translate/index.js';
import { useTranslate } from '@Shared/translate.js';

const pedClone = useClonedPed();
const webview = useWebview();
const api = useClientApi();
const { t } = useTranslate();

let appearance: Appearance = clone.objectData(DefaultAppearance);
let clothes: ClothingComponent[] = clone.arrayData(DefaultClothes);

function updateClothes(isProp: boolean, id: number, data: { drawable: number; dlc: string; texture: number }) {
    const index = clothes.findIndex((item) => item.id === id && item.isProp === isProp);
    if (index > -1) {
        clothes[index].drawable = data.drawable;
        clothes[index].dlc = alt.hash(data.dlc);
        clothes[index].texture = data.texture;
    }
    pedClone.ped.update(appearance, clothes, {
        pos: alt.Player.local.pos,
        heading: pedClone.ped.currentHeading(),
    });
}

function resetClothes() {
    clothes = clone.arrayData(DefaultClothes);
}

function updateAppearance<T extends keyof Appearance>(key: T, value: Appearance[T]) {
    appearance[key] = value;
    pedClone.ped.update(appearance, clothes, {
        pos: alt.Player.local.pos,
        heading: pedClone.ped.currentHeading(),
    });
}

async function handleTogglePedEdit() {
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', true);
    alt.on('disconnect', pedClone.ped.destroy);
    pedClone.ped.update(DefaultAppearance, clothes, {
        pos: alt.Player.local.pos,
        heading: 160,
    });
    await pedClone.camera.create({ distance: 2, zOffset: 0.3 });
    const keys = await api.getAsync('instruction-keys-api');
    keys.showInstructionKeys([
        { key: 'A', text: '' },
        { key: 'D', text: t('character.creator.rotate') },
        { key: 'W', text: '' },
        { key: 'S', text: t('character.creator.updown') },
        { key: 'icon-cartwheel', text: t('character.creator.zoom') },
    ]);
}

async function handleBack() {
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', false);
    native.doScreenFadeOut(0);
    alt.off('disconnect', pedClone.ped.destroy);
    pedClone.ped.destroy();
    pedClone.camera.destroy();
    webview.hide('CharacterCreator');
    alt.emitServer(CharacterCreatorEvents.toServer.exit);

    appearance = clone.objectData(DefaultAppearance);
    clothes = clone.objectData(DefaultClothes);

    const keys = await api.getAsync('instruction-keys-api');
    keys.hideInstructionKeys();
}

function setCamera(navIndex: number) {
    if (navIndex === 0) pedClone.camera.update({ distance: 2, zOffset: 0.3 });
    if (navIndex === 1) pedClone.camera.update({ distance: 1, zOffset: 0.4 });
    if (navIndex === 2) pedClone.camera.update({ distance: 0.6, zOffset: 0.7 });
    if (navIndex === 3) pedClone.camera.update({ distance: 0.6, zOffset: 0.7 });
    if (navIndex === 4) pedClone.camera.update({ distance: 0.6, zOffset: 0.7 });
    if (navIndex === 5) pedClone.camera.update({ distance: 1, zOffset: 0.4 });
    if (navIndex === 6) pedClone.camera.update({ distance: 1.5, zOffset: -0.3 });
    if (navIndex === 7) pedClone.camera.update({ distance: 1.3, zOffset: -0.7 });
    if (navIndex === 8) pedClone.camera.update({ distance: 0.6, zOffset: 0.7 });
    if (navIndex === 9) pedClone.camera.update({ distance: 1, zOffset: 0.4 });
}

function toggleRotation(state: boolean) {
    pedClone.camera.setKeysEnabled(state);
}

alt.onServer(CharacterCreatorEvents.toClient.tooglePedEdit, handleTogglePedEdit);
webview.on(CharacterCreatorEvents.toClient.back, handleBack);
webview.on(CharacterCreatorEvents.toClient.updateAppearance, updateAppearance);
webview.on(CharacterCreatorEvents.toClient.updateClothes, updateClothes);
webview.on(CharacterCreatorEvents.toClient.resetClothes, resetClothes);
webview.on(CharacterCreatorEvents.toClient.setCamera, setCamera);
webview.on(CharacterCreatorEvents.toClient.toggleRotation, toggleRotation);
