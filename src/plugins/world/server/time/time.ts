import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { TimeConfig } from '@Plugins/world/shared/config.js';
import './api.js';

const Rebar = useRebar();
const timeService = Rebar.services.useTimeService();

function updateTime() {
    const time = timeService.getTime();

    if (TimeConfig.useServerTime) {
        const currentTime = new Date(Date.now());
        timeService.setTime(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
    } else {
        let seconds = time.second + TimeConfig.secondsPerSecond;
        let minute = time.minute;
        let hour = time.hour;

        if (seconds >= 60) {
            seconds = 0;
            minute += 1;
            if (minute >= 60) {
                minute = 0;
                hour += 1;
                alt.log(`World Time - ${time.hour <= 9 ? `0${time.hour}` : time.hour}:${time.minute <= 9 ? `0${time.minute}` : time.minute}`);
                if (hour >= 24) {
                    hour = 0;
                }
            }
        }

        timeService.setTime(hour, minute, seconds);
    }
}

function updateAllPlayers() {
    const time = timeService.getTime();

    for (let player of alt.Player.all) {
        if (player.getMeta('disableServerTime')) {
            continue;
        }

        Rebar.player.useWorld(player).setTime(time.hour, time.minute, 0);
    }
}

export function disableServerTimeUpdate(player: alt.Player) {
    player.setMeta('disableServerTime', true);
}

export function enableServerTimeUpdate(player: alt.Player) {
    player.deleteMeta('disableServerTime');
}

alt.setInterval(updateTime, 1000);
alt.on('rebar:timeChanged', updateAllPlayers);

alt.on('playerConnect', (player: alt.Player) => {
    disableServerTimeUpdate(player);
    Rebar.player.useWorld(player).setTime(15, 0, 0);
});
alt.on('rebar:playerCharacterBound', (player: alt.Player) => {
    const time = timeService.getTime();
    Rebar.player.useWorld(player).setTime(time.hour, time.minute, time.second);
    enableServerTimeUpdate(player);
});
