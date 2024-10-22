import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';
import * as alt from 'alt-server';
import { StartupEvents } from '../shared/events.js';

const Rebar = useRebar();
const config = Rebar.useServerConfig();

function loadIpls(player: alt.Player) {
    alt.emitClient(player, StartupEvents.toClient.loadIpls);
}

alt.on('rebar:playerCharacterBound',  loadIpls);

async function init() {
   
 

    config.set('disableCriticalHits', true);
    config.set('disablePistolWhip', true);
    config.set('disableScubaGearRemoval', true);
    config.set('disableVehicleEngineAutoStart', true);
    config.set('disableVehicleEngineAutoStop', true);
    config.set('disableVehicleSeatSwap', true);
    config.set('disableWeaponRadial', true);
    config.set('hideAreaName', true);
    config.set('hideHealthArmour', true);
    config.set('hideMinimapInPage', true);
    config.set('hideMinimapOnFoot', true);
    config.set('hideVehicleName', true);
    config.set('hideVehicleClass', true);
    config.set('hideStreetName', true);
}

init();
