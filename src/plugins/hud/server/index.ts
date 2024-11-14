import { useRebar } from '@Server/index.js';
import * as alt from 'alt-server';

const Rebar = useRebar();

function showHud(player: alt.Player) {
    const webview = Rebar.player.useWebview(player);

    webview.show('Hud', 'overlay');
}

alt.on('playerFullySpawned', showHud);
