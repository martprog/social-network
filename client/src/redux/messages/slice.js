// export function chatMessagesReducer(allChatMessages = [], action) {
//     if (action.type === "chatMessages: uploaded") {
//         console.log('all chat', allChatMessages);
//         allChatMessages = action.payload.allChatMessages;
//     } else if (action.type === "newMessage: uploaded") {
//         allChatMessages = [...allChatMessages, action.payload.msg];
//     }  
//     return allChatMessages;
// }

export function chatMessagesReducer(allChatMessages = [], action) {
    if (action.type === "chatMessages: uploaded") {
        
        allChatMessages = action.payload.allChatMessages.map((item)=>{
            return { ...item, isOnline: false };
        });
    } else if (action.type === "newMessage: uploaded") {
        allChatMessages = [...allChatMessages, action.payload.msg];
    }  
    return allChatMessages;
}

export function getMessages(allChatMessages) {
    return {
        type: "chatMessages: uploaded",
        payload: { allChatMessages },
    };
}

export function addMessage(msg) {
    return {
        type: "newMessage: uploaded",
        payload: {
            msg,
        },
    };
}

