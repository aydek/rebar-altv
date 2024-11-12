import { Weathers } from '@Shared/data/weathers.js';

export const TimeConfig = {
    useServerTime: false,
    secondsPerSecond: 5, // 1 hour will pass every 12 minutes
};

//3600÷5=720 real-life seconds
//720÷60=12 minutes

export const WeatherConfig = {
    weathers: [
        // Weathers in order which they should rotate
        'EXTRASUNNY',
        'CLEAR',
        'CLOUDS',
        'OVERCAST',
        'RAIN',
        'THUNDER',
        'RAIN',
        'FOG',
        'CLEARING',
    ] as Weathers[],
    // Weather changes every 10 minutes
    timeBetweenUpdates: 60000 * 10,
    // Time in seconds to transition to a new weather
    timeToTransition: 5,
};
