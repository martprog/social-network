export function friendsAndReqsReducer(friendsAndReqs = [], action) {
    if (action.type === "friendsAndReqs: uploaded") {
        friendsAndReqs = action.payload.friendsAndReqs;
    } else if (action.type === "friendsAndReqs: accepted") {
        console.log(action);
        friendsAndReqs = friendsAndReqs.map((friend) => {
            if (friend.id == action.payload.id) {
                return {
                    ...friend,
                    accepted: true,
                };
            } else {
                return friend;
            }
        });
    } else if (action.type === "friendsAndReqs: unfriended") {
        friendsAndReqs = friendsAndReqs.filter((friend) => {
            if (friend.id !== action.payload.id) {
                return friend;
            }
        });
    }

    return friendsAndReqs;
}

export function getFriends(friendsAndReqs) {
    return {
        type: "friendsAndReqs: uploaded",
        payload: { friendsAndReqs },
    };
}

export function accept(id) {
    return {
        type: "friendsAndReqs: accepted",
        payload: { id },
    };
}

export function unfriend(id) {
    return {
        type: "friendsAndReqs: unfriended",
        payload: { id },
    };
}
