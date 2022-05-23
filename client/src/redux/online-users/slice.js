export function onlineUsersReducer(onlineUsers = [], action) {
    console.log("online: ", action.type);
    if (action.type == "onlineUsers: uploaded") {
        onlineUsers = action.payload.onlineUsers;
    } 
    console.log('juanes');
    return onlineUsers;
}

export function getOnlineUsers(onlineUsers) {
    return {
        type: "onlineUsers: uploaded",
        payload: { onlineUsers },
    };
}


