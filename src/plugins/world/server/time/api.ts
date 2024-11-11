import { disableServerTimeUpdate, enableServerTimeUpdate } from './time.js';
import { useApi } from '@Server/api/index.js';

export function useServerTimeAPI() {
    return {
        enableServerTimeUpdate,
        disableServerTimeUpdate,
    };
}

declare global {
    export interface ServerPlugin {
        ['server-time-api']: ReturnType<typeof useServerTimeAPI>;
    }
}

useApi().register('server-time-api', useServerTimeAPI());
