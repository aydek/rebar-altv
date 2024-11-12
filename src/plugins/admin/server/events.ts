import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';
import { AdminEvents } from '../shared/events.js';
import { Weathers } from '@Shared/data/weathers.js';

const Rebar = useRebar();
const weatherService = Rebar.services.useWeatherService();

alt.onRpc(AdminEvents.rpctoServer.isAdmin, (player: alt.Player) => {
    const permissions = Rebar.permissions.usePermissions(player);

    return permissions.account.groups.memberOf('admin');
});

alt.onClient(AdminEvents.toServer.setWeather, (player: alt.Player, weather: Weathers) => {
    weatherService.setWeather(weather);
});
