import * as alt from 'alt-server';
declare module 'alt-server' {
    export interface ICustomEmitEvent {
        playerFullySpawned: (player: alt.Player) => void;
    }
}
