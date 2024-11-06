import { getClient } from './bot.js';

export function useDiscordAPI() {
    function client() {
        return getClient();
    }

    return {
        client,
    };
}
