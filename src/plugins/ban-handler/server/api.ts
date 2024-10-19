import { useRebar } from '@Server/index.js';
import { checkBan, permBan, tempBan } from './functions.js';

const Rebar = useRebar();

export function useBanHandler() {
    return {
        tempBan,
        permBan,
        checkBan,
    };
}

declare global {
    export interface ServerPlugin {
        ['ban-handler-api']: ReturnType<typeof useBanHandler>;
    }
}

Rebar.useApi().register('ban-handler-api', useBanHandler());
