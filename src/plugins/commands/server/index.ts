import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();
const messenger = Rebar.messenger.useMessenger();

messenger.commands.register({
    name: 'vehicle',
    desc: '[model] - Create vehicle',
    callback: (player: alt.Player, model: string | number) => {
        try {
            if (!player.valid) return;

            const vehicle = new alt.Vehicle(model, player.pos.x + 3, player.pos.y, player.pos.z, 0, 0, 0);
            vehicle.dimension = player.dimension;

            if (!vehicle.valid) {
                return undefined;
            }

            alt.nextTick(async () => {
                player.setIntoVehicle(vehicle, 1);
                return true;
            });
            Rebar.messenger.useMessenger().message.send(player, { content: 'Enjoy your vehicle', type: 'info' });
        } catch {
            Rebar.messenger.useMessenger().message.send(player, { content: 'Invalid model', type: 'alert' });
        }
    },
});

messenger.commands.register({
    name: 'engine',
    desc: 'Toggle engine',
    callback: (player: alt.Player) => {
        const vehicle = Rebar.vehicle.useVehicle(player.vehicle);
        if (vehicle) {
            vehicle.toggleEngine();
        }
        Rebar.messenger.useMessenger().message.send(player, { content: 'Engine toggled', type: 'info' });
    },
});
