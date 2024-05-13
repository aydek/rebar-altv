import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';

const Rebar = useRebar();

import { Account } from '@Shared/types/account.js';
import { useTranslate } from '@Shared/translate.js';
import '../translate/index.js';
import { DiscordEvents } from '../shared/events.js';
const { t } = useTranslate('en');

const loginCallbacks: Array<(player: alt.Player) => void> = [];
const loginRequest: { [id: string]: boolean } = {};

async function handleToken(player: alt.Player, token: string) {
    if (!token) {
        player.kick(t('dcauth.error.notoken'));
        return;
    }

    if (!loginRequest[player.id]) {
        player.kick(t('dcauth.error.norequest'));
        return;
    }

    const request: Response | undefined = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
        },
    }).catch((err) => {
        alt.logError(err);
        player.kick(t('dcauth.error.norequest'));
        return undefined;
    });

    if (!request || !request.ok) {
        player.kick(t('dcauth.error.badToken'));
        return;
    }

    const data = await request.json();
    if (!data.username || !data.id) {
        player.kick(t('dcauth.error.invalidData'));
        return;
    }

    delete loginRequest[player.id];

    alt.log('heelllooo???????????');
    Rebar.player.useWebview(player).emit(DiscordEvents.toWebview.updateData, {
        id: data.id,
        username: data.username,
        avatar: data.avatar,
    });
}

async function handleConnect(player: alt.Player) {
    loginRequest[player.id] = true;

    player.dimension = player.id + 1;
    Rebar.player.useWebview(player).show('DiscordAuth', 'page');
    Rebar.player.useNative(player).invoke('doScreenFadeOut', 0);
}

async function handleDisconnect(player: alt.Player) {
    delete loginRequest[player.id];
}

alt.onClient(DiscordEvents.toServer.passToken, handleToken);
alt.on('playerConnect', handleConnect);
alt.on('playerDisconnect', handleDisconnect);

export function useAuth() {
    function onLogin(callback: (player: alt.Player) => void) {
        loginCallbacks.push(callback);
    }

    return {
        onLogin,
    };
}

declare global {
    export interface ServerPlugin {
        ['auth-api']: ReturnType<typeof useAuth>;
    }
}

Rebar.useApi().register('auth-api', useAuth());
