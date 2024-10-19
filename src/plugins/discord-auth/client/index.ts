import * as alt from 'alt-client';
import { DiscordAuthEvents } from '../shared/events.js';

async function getDiscordToken(applicationIdentifier: string) {
    let bearerToken: string;

    try {
        bearerToken = await alt.Discord.requestOAuth2Token(applicationIdentifier);
    } catch (err) {
        console.log('Error getDiscordToken');
        console.log(err);
    }

    alt.emitServer(DiscordAuthEvents.toServer.pushToken, bearerToken);
    alt.offServer(DiscordAuthEvents.toClient.requestToken, getDiscordToken);
}

alt.onServer(DiscordAuthEvents.toClient.requestToken, getDiscordToken);
