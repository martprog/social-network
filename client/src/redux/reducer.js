import { combineReducers } from "redux";
import { friendsAndReqsReducer } from "./friends-and-reqs/slice";
import { chatMessagesReducer } from "./messages/slice";
import { userIdReducer } from "./sessionId/slice";

const rootReducer = combineReducers({
    friendsAndReqs: friendsAndReqsReducer,
    chatMessages: chatMessagesReducer,
    userId: userIdReducer
});

export default rootReducer;
