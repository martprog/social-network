import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, accept, unfriend } from "./redux/friends-and-reqs/slice";
import { Link } from "react-router-dom";

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

        // fetch("/api/friends")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         dispatch(getFriends(data));
        //     });
    }, []);

    if (!requests || !friends) {
        return null;
    }

    function handleAccept(id) {
        console.log("handle func, ", id);
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
        const res = await fetch(`/api/remove_friendship/${id}`, {
            method: "POST",
        });
        const data = await res.json();
        dispatch(unfriend(id));
    }

    const reqs = (
        <div>
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
                                <h3>
                                    {request.first} {request.last}
                                </h3>
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
        <div>
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
                                <h3>
                                    {friend.first} {friend.last}
                                </h3>
                            </div>
                        </Link>

                        <button
                            className="btnFriendship friendReq"
                            onClick={() => handleUnfriend(friend.id)}
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
            <div className="new requested">
                {requests.length >= 1 ? reqs: <h2>No new requests</h2>}
            </div>
            <div className="new friended">
                {friends.length >= 1 ? friendships : <h2>No friends</h2>}
            </div>
        </>
    );
}
