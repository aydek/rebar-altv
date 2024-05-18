import * as alt from 'alt-client';
import * as native from 'natives';
import { useClonedPed } from '@Client/ped/clone.js';
import { useWebview } from '@Client/webview/index.js';
import { Appearance } from '@Shared/types/appearance.js';

import { DefaultAppearance, DefaultClothes } from '../shared/defaultAppearance.js';
import { CharacterCreatorEvents } from '../shared/events.js';
import { clone } from '@Shared/utility/index.js';

const pedClone = useClonedPed();
const webview = useWebview();

let appearance: Appearance = clone.objectData(DefaultAppearance);

function updateAppearance<T extends keyof Appearance>(key: T, value: Appearance[T]) {
    appearance[key] = value;
    alt.log(key);
    pedClone.ped.update(appearance, DefaultClothes, {
        pos: alt.Player.local.pos,
        heading: 60,
    });
}

async function handleToggleControls(value: boolean) {
    alt.toggleGameControls(value);
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', !value);

    if (value) {
        alt.off('disconnect', pedClone.ped.destroy);
        pedClone.ped.destroy();
        pedClone.camera.destroy();
    } else {
        alt.on('disconnect', pedClone.ped.destroy);
        pedClone.ped.update(DefaultAppearance, DefaultClothes, {
            pos: alt.Player.local.pos,
            heading: 60,
        });
        await pedClone.camera.create({ bone: 'SKEL_Pelvis', fov: 60, zOffset: 0 });
    }
}

function handleBack() {
    native.doScreenFadeOut(0);
    pedClone.ped.destroy();
    pedClone.camera.destroy();
    webview.hide('CharacterCreator');
    alt.emitServer(CharacterCreatorEvents.toServer.exit);
}

alt.onServer(CharacterCreatorEvents.toClient.toggleControls, handleToggleControls);
webview.on(CharacterCreatorEvents.toClient.back, handleBack);
webview.on(CharacterCreatorEvents.toClient.updateAppearance, updateAppearance);
