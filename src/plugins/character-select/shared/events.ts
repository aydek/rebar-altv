export const CharacterSelectEvents = {
    toServer: {
        handlePlay: 'character:select:toServer:handlePlay',
        openCreator: 'character:select:toServer:openCreator',
        syncAppearance: 'character:select:toServer:syncAppearance',
        delete: 'character:select:toServer:delete',
    },
    toClient: {
        toggleControls: 'character:select:toClient:toggleControls',
    },
    toWebview: {
        setCharacters: 'character:select:toWebview:setCharacters',
    },
};
