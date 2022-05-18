import { combineReducers } from "redux";
import { friendsAndReqsReducer } from "./friends-and-reqs/slice";

const rootReducer = combineReducers({
    friendsAndReqs: friendsAndReqsReducer,
});

export default rootReducer;
