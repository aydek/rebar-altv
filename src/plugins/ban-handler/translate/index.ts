import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'ban.handler.banned': 'You are banned! ',
        'ban.handler.reason': 'Reason',
        'ban.handler.banned.until': 'Until',
    },
    lt: {
        'ban.handler.banned': 'Esate užblokuotas!',
        'ban.handler.reason': 'Priežastis',
        'ban.handler.banned.until': 'Iki',
    },
});
