import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, accept, unfriend } from "./redux/friends-and-reqs/slice";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Friends() {
    const dispatch = useDispatch();

    const requests = useSelector(
        (state) =>
            state.friendsAndReqs &&
            state.friendsAndReqs.filter((request) => request.accepted === false)
    );

    const friends = useSelector(
        (state) =>
            state.friendsAndReqs &&
            state.friendsAndReqs.filter((friend) => friend.accepted === true)
    );

    // console.log("friends: ", friends);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/friends");
            const data = await res.json();
            dispatch(getFriends(data));
        })();
    }, []);

    if (!requests || !friends) {
        return null;
    }

    function handleAccept(id) {
        return fetch(`/api/accept_friendship/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch(accept(id));
            });
    }

    async function handleUnfriend(id) {
        console.log("hola");
        const res = await fetch(`/api/remove_friendship/${id}`, {
            method: "POST",
        });
        const data = await res.json();
        dispatch(unfriend(id));
    }

    const reqs = (
        <div className="friendsAndReqIcon">
            {requests.map((request) => {
                return (
                    <div className="friendsAndReqsWrapper" key={request.id}>
                        <Link
                            style={{ textDecoration: "none" }}
                            to={`/users/${request.id}`}
                        >
                            <div className="searchedAdd">
                                <div>
                                    <img
                                        src={
                                            request.profile_picture_url ||
                                            "./default.png"
                                        }
                                    />
                                </div>
                                <p>
                                    {request.first} {request.last}
                                </p>
                            </div>
                        </Link>
                        <button
                            className="btnFriendship friendReq"
                            onClick={() => handleAccept(request.id)}
                        >
                            Accept request
                        </button>
                    </div>
                );
            })}
        </div>
    );

    const friendships = (
        <div className="friendsAndReqIcon">
            {friends.map((friend) => {
                return (
                    <div className="friendsAndReqsWrapper" key={friend.id}>
                        <Link
                            style={{ textDecoration: "none" }}
                            to={`/users/${friend.id}`}
                        >
                            <div className="searchedAdd">
                                <div>
                                    <img
                                        src={
                                            friend.profile_picture_url ||
                                            "./default.png"
                                        }
                                    />
                                </div>
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                            </div>
                        </Link>

                        <button
                            className="btnFriendship friendReq"
                            onClick={() => {
                                swal({
                                    title: `Sure you want to unfriend ${friend.first}?`,
                                    text: `You will not be friends anymore!`,
                                    icon: "warning",
                                    imageUrl: "./defaul.png",
                                    buttons: true,
                                }).then(function (isConfirm) {
                                    if (isConfirm) {
                                        handleUnfriend(friend.id);
                                    } else {
                                        // swal(
                                        //     "Cancelled",
                                        //     "Your imaginary file is safe :)",
                                        //     "error"
                                        // );
                                        return null;
                                    }
                                });
                            }}
                        >
                            unfriend
                        </button>
                    </div>
                );
            })}
        </div>
    );

    return (
        <>
            <h1>FRIENDS</h1>
            <div className="friendsWrapper">
                <div className="friendsAndReqsWrapper">
                    {requests.length == 1 ? (
                        <h2>
                            You have{" "}
                            <font color="green" size="6">
                                {friends.length}
                            </font>{" "}
                            friend request!
                        </h2>
                    ) : (
                        <h2>
                            You have{" "}
                            <font color="green" size="6">
                                {requests.length}
                            </font>{" "}
                            friend requests!
                        </h2>
                    )}
                    <div className="new newed requested">
                        {requests.length >= 1 ? reqs : <h2>No new requests</h2>}
                    </div>
                </div>

                <div className="friendsAndReqsWrapper">
                    {friends.length == 1 ? (
                        <h2>
                            You have{" "}
                            <font color="green" size="6">
                                {friends.length}
                            </font>{" "}
                            friend!
                        </h2>
                    ) : (
                        <h2>
                            You have{" "}
                            <font color="green" size="6">
                                {friends.length}
                            </font>{" "}
                            friends!
                        </h2>
                    )}
                    <div className="new newed friended">
                        {friends.length >= 1 ? (
                            friendships
                        ) : (
                            <h2>No friends</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
