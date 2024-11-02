import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();

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
            messenger.message.send(player, { content: 'Enjoy your vehicle', type: 'info' });
        } catch {
            messenger.message.send(player, { content: 'Invalid model', type: 'alert' });
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

        messenger.message.send(player, { content: `Your health set to: {00cc00}${value}`, type: 'info' });
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

        messenger.message.send(player, { content: `Your armour set to: {00cc00}${value}`, type: 'info' });
    },
});
