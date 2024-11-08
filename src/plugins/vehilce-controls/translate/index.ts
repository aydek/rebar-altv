import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'vehiclecontrols:engine': 'Engine',
        'vehiclecontrols:door': 'Door',
        'vehiclecontrols:bonnet': 'Bonnet',
        'vehiclecontrols:boot': 'Boot',
    },
    lt: {
        'vehiclecontrols:engine': 'Variklis',
        'vehiclecontrols:door': 'Durys',
        'vehiclecontrols:bonnet': 'Kapotas',
        'vehiclecontrols:boot': 'Bagažinė',
    },
});
