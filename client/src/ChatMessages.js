import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, addMessage } from "./redux/messages/slice";

// import { io } from "socket.io-client";
import { socket } from "./socketInit";

export default function ChatMessages() {
    const inputRef = useRef(null);
    const lastMessageRef = useRef(null);
    const dispatch = useDispatch();

    // const socket = io();

    const chatMessages = useSelector(
        (state) => state.chatMessages && state.chatMessages
    );


    // socket.on("newMessage", (data)=>{
    //     console.log('data: ', data)
    //     dispatch(addMessage(data))
    // })

    useEffect(() => {
        socket.on("chatMessages", function (data) {
            dispatch(getMessages(data));
        });

        // inputRef.current.focus()
        
       
        socket.on("newMessage", (data) => {
            dispatch(addMessage(data));
        });
    }, []);

    useEffect(()=>{
        if (lastMessageRef.current) {
            console.log(lastMessageRef.current);
            lastMessageRef.current.scrollIntoView()
        }
    })

    const executeScroll = () => lastMessageRef.current.scrollIntoView();  

    function handleSubmit(e) {
        e.preventDefault();
        socket.emit("newMessage", {
            text: e.target.text.value,
        });
        e.target.text.value = "";
        

    }

    const msgs = chatMessages.map((message) => {
        return (
            <div key={message.id} ref={lastMessageRef}>
                <p>{message.text}</p>
            </div>
        );
    });

    return (
        <>
            <h1>Chat Room</h1>
            <form onSubmit={handleSubmit}>
                <div className="chat-wrapper" >
                    {chatMessages.length >= 1 ? msgs : <h2>no messages</h2>}
                </div>
                {/* <textarea name="text"></textarea> */}
                <input
                    type="text"
                    name="text"
                    required
                    placeholder="write something"
                    onClick={executeScroll}
                />
                <div className="textareaBtns">
                    <button className="btns">Done!</button>
                </div>
            </form>
        </>
    );
}
