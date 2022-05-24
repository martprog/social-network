export function onlineUsersReducer(onlineUsers = [], action) {
    if (action.type == "onlineUsers: uploaded") {
        onlineUsers = action.payload.onlineUsers;
    }

    return onlineUsers;
}

export function getOnlineUsers(onlineUsers) {
    return {
        type: "onlineUsers: uploaded",
        payload: { onlineUsers },
    };
}
