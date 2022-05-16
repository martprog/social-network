import { useState, useEffect } from "react";

export default function FriendButton({ otherUserId }) {
    const [btnText, setBtnText] = useState("");

    useEffect(() => {
        fetch(`/api/users_friendship/${otherUserId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.noFriendship) {
                    setBtnText("Send Request");
                    return;
                }
                if (data.accepted == true) {
                    setBtnText("Remove Friendship");
                    return;
                } else {
                    return data.sender_id == parseInt(otherUserId)
                        ? setBtnText("Accept Request")
                        : setBtnText("Cancel Request");
                }
            });
    }, [btnText]);

    const changeFriendship = () => {
        if (btnText == "Send Request") {
            fetch(`/api/send_friendship/${otherUserId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setBtnText("Cancel Request");
                    return;
                });
        }
        if (btnText == "Accept Request") {
            fetch(`/api/accept_friendship/${otherUserId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setBtnText("Remove Friendship");
                    return;
                });
        }
        if (btnText == "Cancel Request" || btnText == "Remove Friendship") {
            fetch(`/api/remove_friendship/${otherUserId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setBtnText("Send Request");
                    return;
                });
        }
    };

    return <button onClick={changeFriendship}>{btnText}</button>;
}
