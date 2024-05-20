import * as alt from 'alt-client';
import * as native from 'natives';
import { Appearance } from '../../shared/types/appearance.js';
import { ClothingComponent } from '../../shared/types/clothingComponent.js';

type CameraOptions = { distance: number; zOffset: number };

export function useClonedPed() {
    let ped: number;
    let lastModel: number;
    let camera: number;
    let lastCameraOptions: CameraOptions;
    let currentHeading: number;
    let interval: number;
    let enableKeys: boolean;

    let fwd: alt.IVector3;

    function destroyPed() {
        lastModel = undefined;

        if (typeof ped === 'undefined') {
            return;
        }

        try {
            native.setEntityAlpha(ped, 0, true);
            native.deletePed(ped);
            native.setPedAsNoLongerNeeded(ped);
            ped = undefined;
        } catch (err) {}
    }

    async function updatePed(
        appearance: Appearance,
        clothing: ClothingComponent[],
        options: { pos: alt.Vector3; heading: number },
    ) {
        if (!appearance) {
            return;
        }

        await alt.Utils.requestModel('mp_f_freemode_01');
        await alt.Utils.requestModel('mp_m_freemode_01');

        const model = appearance.sex === 0 ? alt.hash('mp_f_freemode_01') : alt.hash('mp_m_freemode_01');

        currentHeading = options.heading;

        if (lastModel !== model) {
            destroyPed();
            lastModel = model;
            ped = native.createPed(1, model, options.pos.x, options.pos.y, options.pos.z, 0, false, false);
            native.setEntityCoordsNoOffset(ped, options.pos.x, options.pos.y, options.pos.z, false, false, false);
            native.freezeEntityPosition(ped, true);
            native.setEntityInvincible(ped, true);
            native.setEntityRotation(ped, 0, 0, currentHeading, 1, false);
            native.setPedDesiredHeading(ped, currentHeading);
            native.taskSetBlockingOfNonTemporaryEvents(ped, true);
            native.setBlockingOfNonTemporaryEvents(ped, true);
            native.setPedFleeAttributes(ped, 0, true);
            native.setPedCombatAttributes(ped, 17, true);
            native.setPedAsEnemy(ped, false);
        }

        await alt.Utils.waitFor(() => native.doesEntityExist(ped), 5000);
        if (typeof ped === 'undefined') {
            return;
        }

        native.clearPedDecorations(ped);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.setPedHeadBlendData(
            ped,
            appearance.faceMother,
            appearance.faceFather,
            0,
            appearance.skinMother,
            appearance.skinFather,
            0,
            appearance.faceMix,
            appearance.skinMix,
            0,
            false,
        );

        // Hair
        native.setPedComponentVariation(ped, 2, appearance.hair, 0, 0);
        native.setPedHairTint(ped, appearance.hairColor1, appearance.hairColor2);

        // Hair Overlay
        native.addPedDecorationFromHashes(
            ped,
            alt.hash(appearance.hairOverlay.collection),
            alt.hash(appearance.hairOverlay.overlay),
        );

        // Eyebrows
        native.setPedHeadOverlay(ped, 2, appearance.eyebrows, appearance.eyebrowsOpacity);
        native.setPedHeadOverlayTint(ped, 2, 1, appearance.eyebrowsColor1, appearance.eyebrowsColor1);

        // Facial Hair
        native.setPedHeadOverlay(ped, 1, appearance.facialHair, appearance.facialHairOpacity);
        native.setPedHeadOverlayTint(ped, 1, 1, appearance.facialHairColor1, appearance.facialHairColor1);

        if (appearance.chestHair !== null && appearance.chestHair !== undefined) {
            native.setPedHeadOverlay(ped, 10, appearance.chestHair, appearance.chestHairOpacity);
            native.setPedHeadOverlayTint(ped, 10, 1, appearance.chestHairColor1, appearance.chestHairColor1);
        }

        for (let i = 0; i < appearance.structure.length; i++) {
            native.setPedMicroMorph(ped, i, appearance.structure[i]);
        }

        for (let i = 0; i < appearance.headOverlays.length; i++) {
            native.setPedHeadOverlay(
                ped,
                appearance.headOverlays[i].id,
                appearance.headOverlays[i].value,
                appearance.headOverlays[i].opacity,
            );
            native.setPedHeadOverlayTint(
                ped,
                appearance.headOverlays[i].id,
                2,
                appearance.headOverlays[i].color1,
                appearance.headOverlays[i].color2,
            );
        }

        native.setHeadBlendEyeColor(ped, appearance.eyes);

        // Default Clothes for Even Customization
        for (let component of clothing) {
            if (component.isProp) {
                if (component.drawable === -1) {
                    alt.clearPedProp(ped, component.id);
                }
                if (component.dlc != 0) {
                    alt.setPedDlcProp(ped, component.dlc, component.id, component.drawable, component.texture);
                    continue;
                }

                native.setPedPropIndex(ped, component.id, component.drawable, component.texture, true, 0);
                continue;
            }

            if (component.dlc != 0) {
                alt.setPedDlcClothes(
                    ped,
                    component.dlc,
                    component.id,
                    component.drawable,
                    component.texture,
                    component.drawable,
                );
                continue;
            }

            native.setPedComponentVariation(
                ped,
                component.id,
                component.drawable,
                component.texture,
                component.palette ?? 0,
            );
        }
    }

    async function updateCamera(options: CameraOptions, delay: number = 500) {
        if (!lastCameraOptions || !camera) {
            return;
        }

        await alt.Utils.waitFor(() => native.doesEntityExist(ped), 5000);

        lastCameraOptions = options;

        const targetPosition = native.getEntityCoords(ped, true);
        const pos = targetPosition.add(fwd.x * options.distance, fwd.y * options.distance, options.zOffset);

        const c2 = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', pos.x, pos.y, pos.z, 0, 0, 0, 60, false, 1);

        native.setCamActive(c2, true);

        native.pointCamAtCoord(c2, targetPosition.x, targetPosition.y, targetPosition.z + options.zOffset);
        native.setCamActiveWithInterp(c2, camera, delay, 1, 1);
        native.renderScriptCams(true, true, delay, false, false, 0);

        await alt.Utils.wait(delay);

        if (!camera) {
            if (c2) {
                native.destroyCam(c2, true);
            }
            return;
        }

        native.destroyCam(camera, true);
        camera = c2;
    }

    async function createCamera(options: CameraOptions) {
        if (camera) {
            return;
        }

        await alt.Utils.waitFor(() => typeof ped !== 'undefined' && native.doesEntityExist(ped), 5000);

        lastCameraOptions = options;

        fwd = native.getEntityForwardVector(ped);

        const targetPosition = native.getEntityCoords(ped, true);
        const pos = targetPosition.add(fwd.x * options.distance, fwd.y * options.distance, options.zOffset);
        camera = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', pos.x, pos.y, pos.z, 0, 0, 0, 60, false, 1);

        native.setCamActive(camera, true);
        native.pointCamAtCoord(camera, targetPosition.x, targetPosition.y, targetPosition.z + options.zOffset);
        native.renderScriptCams(true, true, 1000, false, false, 0);

        enableKeys = true;

        if (typeof interval === 'undefined') {
            interval = alt.setInterval(tick, 0);
        }
        alt.toggleGameControls(true);
    }

    function setKeysEnabled(state: boolean) {
        enableKeys = state;
    }

    function destroyCamera() {
        alt.clearInterval(interval);
        interval = undefined;

        native.destroyAllCams(true);
        native.setCamActive(camera, false);
        native.renderScriptCams(false, false, 0, false, false, 0);
        camera = undefined;
    }

    function tick() {
        native.hideHudAndRadarThisFrame();
        native.disableAllControlActions(0);
        native.disableAllControlActions(1);
        native.disableControlAction(0, 0, true);
        native.disableControlAction(0, 1, true);
        native.disableControlAction(0, 2, true);
        native.disableControlAction(0, 24, true);
        native.disableControlAction(0, 25, true);
        native.disableControlAction(0, 32, true); // w
        native.disableControlAction(0, 33, true); // s
        native.disableControlAction(0, 34, true); // a
        native.disableControlAction(0, 35, true); // d
        native.disableControlAction(0, 22, true); //space bar

        if (camera === null || camera === undefined) {
            return;
        }

        if (!enableKeys) {
            return;
        }

        // d
        if (native.isDisabledControlPressed(0, 35)) {
            const newHeading = (currentHeading += 2);
            native.setEntityHeading(ped, newHeading);
        }

        // a
        if (native.isDisabledControlPressed(0, 34)) {
            const newHeading = (currentHeading -= 2);
            native.setEntityHeading(ped, newHeading);
        }

        const [_d, width, _] = native.getActualScreenResolution(0, 0);
        const cursor = alt.getCursorPos();
        const _x = cursor.x;
        const startPosition = native.getEntityCoords(ped, true);

        //Space bar
        if (native.isDisabledControlPressed(0, 22) && alt.debug) {
            alt.log(`zOffset: ${lastCameraOptions.zOffset} distance: ${lastCameraOptions.distance}`);
        }

        // Scroll Up
        if (native.isDisabledControlPressed(0, 15)) {
            if (_x < width / 2 + 250 && _x > width / 2 - 250) {
                lastCameraOptions.distance -= 0.05;

                if (lastCameraOptions.distance < 0.7) {
                    lastCameraOptions.distance = 0.7;
                }

                const newFwd: alt.Vector3 = {
                    x: startPosition.x + fwd.x * lastCameraOptions.distance,
                    y: startPosition.y + fwd.y * lastCameraOptions.distance,
                    z: startPosition.z,
                } as alt.Vector3;

                native.setCamCoord(camera, newFwd.x, newFwd.y, newFwd.z + lastCameraOptions.zOffset);
                native.setCamActive(camera, true);
                native.renderScriptCams(true, false, 0, true, false, 0);
            }
        }

        // SCroll Down
        if (native.isDisabledControlPressed(0, 16)) {
            if (_x < width / 2 + 250 && _x > width / 2 - 250) {
                lastCameraOptions.distance += 0.05;

                if (lastCameraOptions.distance > 2.5) {
                    lastCameraOptions.distance = 2.5;
                }

                const newFwd: alt.Vector3 = {
                    x: startPosition.x + fwd.x * lastCameraOptions.distance,
                    y: startPosition.y + fwd.y * lastCameraOptions.distance,
                    z: startPosition.z,
                } as alt.Vector3;

                native.setCamCoord(camera, newFwd.x, newFwd.y, newFwd.z + lastCameraOptions.zOffset);
                native.setCamActive(camera, true);
                native.renderScriptCams(true, false, 0, true, false, 0);
            }
        }
        // W
        if (native.isDisabledControlPressed(0, 32)) {
            lastCameraOptions.zOffset += 0.01;

            if (lastCameraOptions.zOffset > 1) {
                lastCameraOptions.zOffset = 1;
            }

            const newFwd: alt.Vector3 = {
                x: startPosition.x + fwd.x * lastCameraOptions.distance,
                y: startPosition.y + fwd.y * lastCameraOptions.distance,
                z: startPosition.z,
            } as alt.Vector3;

            native.setCamCoord(camera, newFwd.x, newFwd.y, newFwd.z + lastCameraOptions.zOffset);
            native.pointCamAtCoord(
                camera,
                startPosition.x,
                startPosition.y,
                startPosition.z + lastCameraOptions.zOffset,
            );
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, 0);
        }
        // S
        if (native.isDisabledControlPressed(0, 33)) {
            lastCameraOptions.zOffset -= 0.01;

            if (lastCameraOptions.zOffset < -0.8) {
                lastCameraOptions.zOffset = -0.8;
            }

            const forwardCameraPosition: alt.Vector3 = {
                x: startPosition.x + fwd.x * lastCameraOptions.distance,
                y: startPosition.y + fwd.y * lastCameraOptions.distance,
                z: startPosition.z,
            } as alt.Vector3;

            native.setCamCoord(
                camera,
                forwardCameraPosition.x,
                forwardCameraPosition.y,
                forwardCameraPosition.z + lastCameraOptions.zOffset,
            );
            native.pointCamAtCoord(
                camera,
                startPosition.x,
                startPosition.y,
                startPosition.z + lastCameraOptions.zOffset,
            );
            native.setCamActive(camera, true);
            native.renderScriptCams(true, false, 0, true, false, 0);
        }
    }

    return {
        ped: {
            destroy: destroyPed,
            get() {
                return ped;
            },
            currentHeading() {
                return currentHeading;
            },
            update: updatePed,
        },
        camera: {
            create: createCamera,
            destroy: destroyCamera,
            setKeysEnabled,
            get() {
                return camera;
            },
            update: updateCamera,
        },
    };
}
