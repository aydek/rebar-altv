import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'vehiclecontrols:vehicle': 'Vehicle',
        'vehiclecontrols:engine': 'Engine',
        'vehiclecontrols:door': 'Door',
        'vehiclecontrols:bonnet': 'Bonnet',
        'vehiclecontrols:boot': 'Boot',
    },
    lt: {
        'vehiclecontrols:vehicle': 'Transportas',
        'vehiclecontrols:engine': 'Variklis',
        'vehiclecontrols:door': 'Durys',
        'vehiclecontrols:bonnet': 'Kapotas',
        'vehiclecontrols:boot': 'Bagažinė',
    },
});
