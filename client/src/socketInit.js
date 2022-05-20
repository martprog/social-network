import { getMessages, addMessage } from "./redux/messages/slice.js";
import { io } from "socket.io-client";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) =>
            store.dispatch(getMessages(msgs))
        );

        socket.on("chatMessage", (msg) =>
            store.dispatch(addMessage(msg))
        );
    }
};
