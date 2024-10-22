export const ChatEvents = {
    toServer: {
        isChatting: 'webview:chat:is:chatting',
    },
    toClient: {
        unfocus: 'chatevents:unfocus',
        getSettings: 'chatevents:toclient:getsettings',
        setSettings: 'chatevents:toCliente:setsettings',
    },
    toWebview: {
        focus: 'webview:chat:focus',
        unfocus: 'webview:chat:unfocus',
        send: 'webview:chat:send',
        commands: 'webview:chat:commands',
        setSettings: 'chatevents:towebview:setsettings',
    },
};
