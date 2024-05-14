import { useConfig } from '@Server/config/index.js';

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
        }
    }
}

declare module '@Server/config/index.js' {
    interface Config {
        // Name of key could be different from env variable, it doesn't matter.
        discord_bot_token: string;
    }
}

const config = useConfig();

config.initFromEnv('discord_bot_token', {
    env: 'DISCORD_BOT_TOKEN',
    default: '',
    required: true,
});

export const DiscordConfig = {
    BOT_TOKEN: config.getField('discord_bot_token'),
    BOT_STATES: ['[_player_count_/250] players connected', '_vehicle_count_ vehicles spawned', 'sooo funny'],
    BOT_WEBSITE_URL: 'sabter.net',
};
