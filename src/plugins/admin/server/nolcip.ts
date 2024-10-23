import * as alt from 'alt-server';
import { AdminEvents } from '../shared/events.js';

function handleCamUpdate(player: alt.Player, pos: alt.Vector3) {
    player.spawn(pos.x, pos.y, pos.z);
}

function disable(player: alt.Player) {
    player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);
    player.visible = true;
    player.health = 199;
}

function enable(player: alt.Player) {
    player.visible = false;
}

alt.onClient(AdminEvents.noclip.update, handleCamUpdate);
alt.onClient(AdminEvents.noclip.enable, enable);
alt.onClient(AdminEvents.noclip.disable, disable);
