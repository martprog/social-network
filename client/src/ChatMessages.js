import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getMessages, addMessage } from "./redux/messages/slice";
import { getUserId } from "./redux/sessionId/slice";
// import { getOnlineUsers } from "./redux/online-users/slice";
import { Link } from "react-router-dom";

// import { io } from "socket.io-client";
import { socket } from "./socketInit";

export default function ChatMessages() {
    const [isOpen, setIsOpen] = useState(false);
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
    const onlineUsers = useSelector(
        (state) => state.onlineUsers && state.onlineUsers
    );

    useEffect(() => {
        (async () => {
            const res = await fetch("/user/id.json");
            const data = await res.json();
            dispatch(getUserId(data.userId));
        })();
    }, []);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [chatMessages]);

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
                {onlineUsers.find(
                    (element) =>
                        element.id === message.userid ||
                        message.isOnline === true
                ) ? (
                    <span className="dot"></span>
                ) : (
                    <span className="red-dot"></span>
                )}
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
                                {userId == message.sender_id ? (
                                    <strong>You</strong>
                                ) : (
                                    <strong>
                                        {message.first} {message.last}
                                    </strong>
                                )}
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

    const displayOnline = onlineUsers.map((user) => {
        return (
            <div className="online-wrapper" key={user.id}>
                <img src={user.profile_picture_url} />
                <p>
                    {user.first} {user.last}{" "}
                </p>
            </div>
        );
    });

    function handleIsOpen() {
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <>
            <h1>Chat Room</h1>
            <div className="chatroom-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="chat-wrapper">
                        {chatMessages.length >= 1 ? msgs : <h2>no messages</h2>}
                    </div>
                    <div className="chat-inpBtn">
                        <input
                            type="text"
                            name="text"
                            required
                            autoComplete="off"
                            placeholder="write something"
                        />
                        <div className="textareaBtns">
                            <button className="btns">Done!</button>
                        </div>
                    </div>
                </form>
                <div onClick={handleIsOpen} className="online-multiwrapper">
                    <h3>
                        <font color="green" size="6">
                            {onlineUsers.length}
                        </font>{" "}
                        Online users
                    </h3>
                    {isOpen ? (
                        <div className="users-online">
                            {onlineUsers.length >= 1 ? (
                                displayOnline
                            ) : (
                                <h3>No one &apos s around!</h3>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
