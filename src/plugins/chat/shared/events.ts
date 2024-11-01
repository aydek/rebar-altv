export const ChatEvents = {
    toServer: {
        isChatting: 'webview:chat:is:chatting',
        getCommands: 'chatevents:toserver:getcommands',
    },
    toClient: {
        unfocus: 'chatevents:unfocus',
    },
    toWebview: {
        focus: 'webview:chat:focus',
        unfocus: 'webview:chat:unfocus',
        send: 'webview:chat:send',
    },
};
