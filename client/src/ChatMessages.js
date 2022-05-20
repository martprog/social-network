import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, addMessage } from "./redux/messages/slice";
import { getUserId } from "./redux/sessionId/slice";
import { Link } from "react-router-dom";

// import { io } from "socket.io-client";
import { socket } from "./socketInit";

export default function ChatMessages() {
    const lastMessageRef = useRef(null);
    const dispatch = useDispatch();

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.toDateString()}`;
    }

    const chatMessages = useSelector(
        (state) => state.chatMessages && state.chatMessages
    );

    const userId = useSelector((state) => state.userId && state.userId);

    useEffect(() => {
        socket.on("chatMessages", function (data) {
            dispatch(getMessages(data));
        });

        socket.on("newMessage", (data) => {
            dispatch(addMessage(data));
        });

        socket.on("userId", (data) => {
            dispatch(getUserId(data));
        });
    }, []);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    });

    // const executeScroll = () => lastMessageRef.current.scrollIntoView();

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("newMessage", {
            text: e.target.text.value,
        });
        e.target.text.value = "";
    }

    const msgs = chatMessages.map((message) => {
        return (
            <div
                className="msg-container"
                key={message.id}
                ref={lastMessageRef}
            >
                <img src={message.profile_picture_url} />
                <div className="msg-details">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={
                            userId == message.sender_id
                                ? "/"
                                : `/users/${message.sender_id}`
                        }
                    >
                        <div className="msg-row">
                            <p>
                                <strong>
                                    {message.first} {message.last}
                                </strong>{" "}
                            </p>
                            <p
                                className="datechat"
                                style={{
                                    marginLeft: ".8rem",
                                    // width: "12rem",
                                }}
                            >
                                <font size="1">
                                    {formatDate(message.created_at)}
                                </font>
                            </p>
                        </div>
                    </Link>
                    <p>{message.text}</p>
                </div>
            </div>
        );
    });

    return (
        <>
            <h1>Chat Room</h1>
            <form onSubmit={handleSubmit}>
                <div className="chat-wrapper">
                    {chatMessages.length >= 1 ? msgs : <h2>no messages</h2>}
                </div>
                <input
                    type="text"
                    name="text"
                    required
                    placeholder="write something"
                />
                <div className="textareaBtns">
                    <button className="btns">Done!</button>
                </div>
            </form>
        </>
    );
}
