import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { WeatherConfig } from '../../shared/config.js';
import { Weathers } from '@Shared/data/weathers.js';
import './api.js';

const Rebar = useRebar();
const weatherService = Rebar.services.useWeatherService();

let weatherIndex = 0;

function updatePlayerWeather(player: alt.Player, weatherType: Weathers) {
    Rebar.player.useWorld(player).setWeather(weatherType, WeatherConfig.timeToTransition);
}

function updateWeather() {
    weatherIndex += 1;

    const weathers = weatherService.getWeatherForecast();
    if (weatherIndex >= weathers.length) {
        weatherIndex = 0;
    }

    weatherService.setWeather(weathers[weatherIndex]);
}

function handleWeatherChange(weather: Weathers) {
    for (let player of alt.Player.all) {
        if (!Rebar.player.useStatus(player).hasCharacter()) {
            continue;
        }
        if (player.getMeta('disableServerWeather')) {
            continue;
        }

        updatePlayerWeather(player, weather);
    }

    alt.log(`Weather is now: ${weather}`);
}

export function disableServerWeatherUpdate(player: alt.Player) {
    player.setMeta('disableServerWeather', true);
}

export function enableServerWeatherUpdate(player: alt.Player) {
    player.deleteMeta('disableServerWeather');
}

weatherService.setWeatherForecast(WeatherConfig.weathers);

alt.on('playerConnect', (player: alt.Player) => {
    disableServerWeatherUpdate(player);
    updatePlayerWeather(player, 'EXTRASUNNY');
});

alt.on('playerFullySpawned', (player: alt.Player) => {
    enableServerWeatherUpdate(player);
    updatePlayerWeather(player, weatherService.getWeather());
});

alt.on('rebar:weatherChanged', handleWeatherChange);
alt.setInterval(updateWeather, WeatherConfig.timeBetweenUpdates);
