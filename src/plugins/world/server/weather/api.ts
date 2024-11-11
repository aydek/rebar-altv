import { useApi } from '@Server/api/index.js';
import { disableServerWeatherUpdate, enableServerWeatherUpdate } from './weather.js';

export function useServerWeatherAPI() {
    return {
        enableServerWeatherUpdate,
        disableServerWeatherUpdate,
    };
}

declare global {
    export interface ServerPlugin {
        ['server-weather-api']: ReturnType<typeof useServerWeatherAPI>;
    }
}

useApi().register('server-weather-api', useServerWeatherAPI());
