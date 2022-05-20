import { combineReducers } from "redux";
import { friendsAndReqsReducer } from "./friends-and-reqs/slice";
import { chatMessagesReducer } from "./messages/slice";

const rootReducer = combineReducers({
    friendsAndReqs: friendsAndReqsReducer,
    chatMessages: chatMessagesReducer
});

export default rootReducer;
