import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'hud:hud': 'Hud',
        'hud:hide:all': 'Hide hud',
        'hud:hide:compass': 'Hide compass',
        'hud:hide:speedometer': 'Hide speedometer',
        'hud:hide:stats': 'Hide stats',
    },
    lt: {
        'hud:hud': `Hud'as`,
        'hud:hide:all': 'Paslėpti hud',
        'hud:hide:compass': 'Paslėpti kompasą',
        'hud:hide:speedometer': 'Paslėpti spidometrą',
        'hud:hide:stats': 'Paslėpti statistikas',
    },
});

