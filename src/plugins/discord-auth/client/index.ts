import * as alt from 'alt-client';
import * as native from 'natives';
import { useWebview } from '@Client/webview/index.js';
import { DiscordEvents } from '../shared/events.js';

const webview = useWebview();
const DISCORD_APP_ID = '955250749867175966';

async function beginAuth() {
    try {
        await alt.Utils.waitFor(() => alt.isGameFocused(), 99999999999);
    } catch (error) {
        native.restartGame();
    }

    try {
        const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
        alt.emitServer(DiscordEvents.toServer.passToken, token);
    } catch (e) {
        alt.logError(e);
        alt.emitServer(DiscordEvents.toServer.passToken, undefined);
    }
    webview.off(DiscordEvents.toClient.beginAuth);
}

webview.on(DiscordEvents.toClient.beginAuth, beginAuth);
