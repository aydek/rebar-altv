import * as alt from 'alt-client';
import * as native from 'natives';

const interval = alt.everyTick(() => {
    /** Disable all scroll wheel buttons */
    native.disableControlAction(0, 14, true);
    native.disableControlAction(0, 15, true);
    native.disableControlAction(0, 16, true);
    native.disableControlAction(0, 17, true);
    native.disableControlAction(0, 99, true);
    native.disableControlAction(0, 100, true);
    native.disableControlAction(0, 115, true);
    native.disableControlAction(0, 116, true);
    native.disableControlAction(0, 261, true);
    native.disableControlAction(0, 262, true);
    /** Radio controls */
    native.disableControlAction(0, 81, true);
    native.disableControlAction(0, 82, true);
    native.disableControlAction(0, 83, true);
    native.disableControlAction(0, 84, true);
    native.disableControlAction(0, 85, true);


    native.scaleformMovieMethodAddParamInt(3);
    native.endScaleformMovieMethod();
});

alt.on('resourceStop', () => {
    alt.clearEveryTick(interval);
});
