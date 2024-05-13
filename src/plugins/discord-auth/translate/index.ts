import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'dcauth.div.welcome': 'Welcome to the server!',
        'dcauth.div.authorizing': 'Authorizing using discord...',
        'dcauth.div.disclamer': 'If nothing happens in 5 seconds, minimize the game and check discord client.',

        'dcauth.div.login': 'Logging in...',

        'dcauth.error.notoken': 'Discord Application was not launched. Rejoin with Discord Launched.',
        'dcauth.error.norequest': 'No login request found. Rejoin server.',
        'dcauth.error.badToken': 'Could not authorize token. Rejoin server.',

        'dcauth.error.invalidData': 'Discord data was invalid. Rejoin server.',
    },
    lt: {
        'dcauth.div.welcome': 'Sveiki atvykę!',
        'dcauth.div.authorizing': 'Autorizuojama naudojant discord...',
        'dcauth.div.disclamer': 'Jei nieko neįvyko per 5 secundes, patikrinkite discord klientą.',

        'dcauth.div.login': 'Jungiamasi...',

        'dcauth.error.notoken': 'Discord programa nepaleista. Prisijunkite iš naujo su atidarytu discord klientu.',
        'dcauth.error.norequest': 'Neradome prisijungimo prašymo, bandykite iš naujo.',
        'dcauth.error.badToken': 'Autorizacija nepavyko, bandykite iš naujo. (Bad Token)',

        'dcauth.error.invalidData': 'Discord duomenys netinkami, bandykite iš naujo.',
    },
});
