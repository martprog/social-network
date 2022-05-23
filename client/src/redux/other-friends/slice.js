export function otherFriendsReducer(otherFriends = [], action) {
    if (action.type === "otherFriends: uploaded") {
        otherFriends = action.payload.otherFriends;
        
    } 
    console.log(otherFriends);
    return otherFriends;
}

export function getOtherFriends(otherFriends) {
    return {
        type: "otherFriends: uploaded",
        payload: { otherFriends },
    };
}


