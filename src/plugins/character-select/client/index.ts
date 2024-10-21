import * as alt from 'alt-client';
import * as native from 'natives';
import { useCamera } from '@Client/player/camera.js';
import { CharacterSelectEvents } from '../shared/events.js';

const camera = useCamera();

function handleToggleControls(value: boolean) {
    alt.toggleGameControls(value);
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', !value);

    if (value) {
        camera.destroy();
    } else {
        camera.create({ fov: 60, bone: 'SKEL_Pelvis', zOffset: 0.7 });
    }

}

alt.onServer(CharacterSelectEvents.toClient.toggleControls, handleToggleControls);
