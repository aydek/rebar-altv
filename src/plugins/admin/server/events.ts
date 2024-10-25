import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';
import { AdminEvents } from '../shared/events.js';

const Rebar = useRebar();

alt.onRpc(AdminEvents.rpctoServer.isAdmin, (player: alt.Player) => {
    const permissions = Rebar.permissions.usePermissions(player);

    return permissions.account.groups.memberOf('admin');
});
