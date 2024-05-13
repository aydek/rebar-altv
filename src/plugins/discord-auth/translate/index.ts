import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'discord.auth.to.long': 'No session request found. Restart client.',
        'discord.auth.no.session': 'No session request found. Restart client.',
        'discord.auth.already.complete': 'Session request already completed. Restart client.',
        'discord.auth.expired.session': 'Authentication session expired. Restart client.',
        'discord.auth.token.failed': 'Failed to Authenticate with Discord. Restart client.',
        'discord.auth.request.failed': 'Cannot get current your Discord user.',
        'discord.auth.account.failed': 'Failed to get or create account.',
        'discord.auth.guild.no.member': `You aren't in our discord server, please join before connect.`,
        'discord.auth.guild.no.whitelist': 'You are not whitelisted. Please check our whitelist policy.',
        'discord.auth.success': 'has authenticated.',
        'discord.auth.banned': 'You are banned! ',
        'discord.auth.banned.no.reason': 'Without any reason.',

        'discord.auth.title': 'Discord Authentication',
        'discord.auth.subtile': 'Authorizing using discord...',
        'discord.auth.information': 'If nothing happens in 5 seconds, minimize the game and check discord client.',
        'discord.auth.login': 'Logging in...',
    },
    lt: {
        'discord.auth.to.long': 'Sesijos prašymas nerastas. Bandykite dar kartą.',
        'discord.auth.no.session': 'Sesijos prašymas nerastas. Bandykite dar kartą.',
        'discord.auth.already.complete': 'Sesijos prašymas nerastas. Bandykite dar kartą.',
        'discord.auth.expired.session': 'Autorizacija užtruko per ilgai. Bandykite dar kartą.',
        'discord.auth.token.failed': 'Nepavyko autorizacija. Bandykite dar kartą.',
        'discord.auth.request.failed': 'Nepavyko rasti discord paskyros.',
        'discord.auth.account.failed': 'Nepavyko sukurti paskyros',
        'discord.auth.guild.no.member': 'Prisijunkite prie mūsų discord serverio ir bandykite dar kartą.',
        'discord.auth.guild.no.whitelist': 'Paskyra nėra patvirtinta, daugiau informacijos discord serveryje.',
        'discord.auth.success': 'has authenticated.',
        'discord.auth.banned': 'Esate užblokuotas!',
        'discord.auth.banned.no.reason': 'Be priežasties',

        'discord.auth.title': 'Discord Autorizacija',
        'discord.auth.subtile': 'Prisijungiama su discord...',
        'discord.auth.information': 'Jei neprisijungsite per 5 sekundes patikrinkite discord klientą.',
        'discord.auth.login': 'Prisijungiama...',
    },
});
