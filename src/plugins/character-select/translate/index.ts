import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'character.select.title': 'Character select',
        'character.select.not.found': 'No characters found',
        'character.select.create.new': 'Create new',
        'character.select.play': 'Play',
        'character.select.delete': 'Delete',
        'character.select.cash': 'Cash',
        'character.select.played': 'Played',
        'character.select.are.you.sure': 'Are you sure you want to delete character',
        'character.select.back': 'Back',
    },
    lt: {
        'character.select.title': 'Veikėjo pasirinkimas',
        'character.select.not.found': 'Veikėjų nerasta',
        'character.select.create.new': 'Sukurti naują',
        'character.select.play': 'Žaisti',
        'character.select.delete': 'Pašalinti',
        'character.select.cash': 'Pinigai',
        'character.select.played': 'Žaista',
        'character.select.are.you.sure': 'Ar esate tikri jog norite pašalinti veikėją',
        'character.select.back': 'Atgal',
    },
});
