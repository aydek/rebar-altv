import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { useNotificationAPI } from '@Plugins/notifications/server/api.js';
import { useVitalityAPI } from '@Plugins/vitality/server/api.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();
const notifications = useNotificationAPI();
const vitals = useVitalityAPI();

messenger.commands.register({
    name: 'veh',
    desc: '[model] - Create vehicle',
    callback: (player: alt.Player, model: string | number) => {
        try {
            if (!player.valid) return;

            const vehicle = new alt.Vehicle(model, player.pos.x + 3, player.pos.y, player.pos.z, 0, 0, 0);
            vehicle.dimension = player.dimension;

            if (!vehicle.valid) {
                return undefined;
            }

            alt.setTimeout(() => {
                player.setIntoVehicle(vehicle, 1);
            }, 500);
            notifications.show(player, 'Enjoy your vehicle', 'success');
        } catch {
            notifications.show(player, 'Invalid model', 'error');
        }
    },
});

messenger.commands.register({
    name: 'health',
    desc: '[number] - Set your health',
    callback: (player: alt.Player, val: string) => {
        if (!player.valid) return;
        const value = Number(val);

        if (isNaN(value)) {
            messenger.message.send(player, { content: '{cc0000} Invalid value', type: 'alert' });
            return;
        }

        if (value > 200 || value < 100) {
            messenger.message.send(player, { content: '{cc0000} Value has to be between 100 and 200', type: 'alert' });
            return;
        }

        player.health = value;
        notifications.show(player, `Your health set to: {00cc00}${value}`, 'success');
    },
});

messenger.commands.register({
    name: 'armour',
    desc: '[number] - Set your armour',
    callback: (player: alt.Player, val: string) => {
        if (!player.valid) return;
        const value = Number(val);

        if (isNaN(value)) {
            messenger.message.send(player, { content: '{cc0000} Invalid value', type: 'alert' });
            return;
        }

        if (value > 100 || value < 0) {
            messenger.message.send(player, { content: '{cc0000} Value has to be between 0 and 100', type: 'alert' });
            return;
        }

        player.armour = value;
        notifications.show(player, `Your armour set to: {00cc00}${value}`, 'success');
    },
});

messenger.commands.register({
    name: 'food',
    desc: '[number] - Set your food',
    callback: (player: alt.Player, val: string) => {
        if (!player.valid) return;
        const value = Number(val);

        if (isNaN(value)) {
            messenger.message.send(player, { content: '{cc0000} Invalid value', type: 'alert' });
            return;
        }

        if (value > 100 || value < 0) {
            messenger.message.send(player, { content: '{cc0000} Value has to be between 0 and 100', type: 'alert' });
            return;
        }

        vitals.set(player, 'food', value);
        notifications.show(player, `Your food set to: {00cc00}${value}`, 'success');
    },
});

messenger.commands.register({
    name: 'water',
    desc: '[number] - Set your water',
    callback: (player: alt.Player, val: string) => {
        if (!player.valid) return;
        const value = Number(val);

        if (isNaN(value)) {
            messenger.message.send(player, { content: '{cc0000} Invalid value', type: 'alert' });
            return;
        }

        if (value > 100 || value < 0) {
            messenger.message.send(player, { content: '{cc0000} Value has to be between 0 and 100', type: 'alert' });
            return;
        }

        vitals.set(player, 'water', value);
        notifications.show(player, `Your water set to: {00cc00}${value}`, 'success');
    },
});
