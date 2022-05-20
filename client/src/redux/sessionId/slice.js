export function userIdReducer(userId = [], action) {
    if (action.type === "userId: uploaded") {
        userId = action.payload.userId;
    } 
    return userId;
}

export function getUserId(userId) {
    return {
        type: "userId: uploaded",
        payload: { userId },
    };
}


