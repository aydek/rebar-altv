import * as alt from 'alt-server';
import { useRebar } from '@Server/index.js';
import { Character } from '@Shared/types/character.js';
import { CollectionNames } from '@Server/document/shared.js';

const Rebar = useRebar();
const db = Rebar.database.useDatabase();
const api = Rebar.useApi();

const spawnCoords = new alt.Vector3(0, 0, 72);

async function handleSpawn(player: alt.Player, character: Character) {
    const world = Rebar.player.useWorld(player);
    const clothing = Rebar.player.useClothing(player);
    const appearance = Rebar.player.usePlayerAppearance(player);
    const state = Rebar.player.useState(player);
    const native = Rebar.player.useNative(player);

    appearance.sync();
    clothing.sync();
    state.sync();
    native.invoke('displayRadar', true);

    if (character.newCharacter) {
        player.pos = spawnCoords;
        db.update<Character>({ newCharacter: false, _id: character._id, account_id: character.account_id }, CollectionNames.Characters);
    }

    player.frozen = false;
    player.visible = true;
    world.clearScreenFade(500);
}

async function init() {
    const charSelect = await api.getAsync('character-select-api');
    charSelect.onSelect(handleSpawn);
}

init();
