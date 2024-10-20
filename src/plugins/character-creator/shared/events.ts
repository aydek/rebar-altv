export const CharacterCreatorEvents = {
    toClient: {
        updateAppearance: 'character:creator:toClient:updateAppearance',
        updateClothes: 'character:creator:toClient:updateClothes',
        resetClothes: 'character:creator:toClient:resetClothes',
        save: 'character:creator:toClient:save',
        back: 'character:creator:toClient:back',
        toggleRotation: 'character:creator:toClient:toggleRotation',
        tooglePedEdit: 'character:creator:toClient:tooglePedEdit',
        setCamera: 'character:creator:toClient:setCamera',
    },
    toServer: {
        nameCheck: 'character:creator:toServer:nameCheck',
        exit: 'character:creator:toServer:exit',
    },
};
