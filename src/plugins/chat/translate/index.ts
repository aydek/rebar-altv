import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'chat:placeholder': 'Input message...',
        'chat:setting:timestaps': 'Show timestamps at the messages',
        'chat:setting:autohide': 'Automatically hide chat',
        'chat:setting:fontsize': 'Fontsize',
    },
    lt: {
        'chat:placeholder': 'Įveskite tekstą...',
        'chat:setting:timestaps': 'Rodyti laiką prie žinučių',
        'chat:setting:autohide': 'Automatiškai paslėpti',
        'chat:setting:fontsize': 'Šrifto dydis',
    },
});
