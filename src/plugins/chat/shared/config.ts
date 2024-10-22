export const chatConfig = {
    maxHistoryMessages: 15,
    maxInputSize: 120,
    chatDistance: 25,
    globalChat: false,
    keybinds: {
        open: 84, // t
        openWithPrefix: 191, // /
        close: 27, // escape
    },
    chatSettings: {
        width: window.screen.availWidth / 3,
        height: window.screen.availHeight / 2.5,
        timestamps: !('alt' in window),
        autohide: true,
        fontsize: 1,
    },
};
