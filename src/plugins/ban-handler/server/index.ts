import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import './api.js';
import { useDiscordAuthAPI } from '@Plugins/discord-auth/server/api.js';

const Rebar = useRebar();

async function handleLogin(player: alt.Player) {
    const account = Rebar.document.account.useAccount(player);
    const data = account.get();

    if (!data.ips) {
        await account.set('ips', [player.ip]);
    }

    if (data.ips && data.ips.length > 5 && !data.ips.includes(player.ip)) {
        data.ips.shift();
        data.ips.push(player.ip);
        await account.set('ips', data.ips);
    }

    await account.set('hardware', [player.hwidHash, player.hwidExHash]);
}

async function init() {
    const auth = useDiscordAuthAPI();
    auth.onLogin(handleLogin);
}

init();
