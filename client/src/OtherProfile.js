import { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router";

import {
    Transition,
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from "react-transition-group";
import FriendButton from "./FriendButton";
// import FriendsOtherProfile from "./FriendsOtherProfile";

export default function OtherProfile() {
    const [otherProfile, setOtherProfile] = useState({});
    const [transition, setTransition] = useState(true);

    const { otherUserId } = useParams();

    const history = useHistory();

    useEffect(() => {
        fetch(`/api/users/${+otherUserId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    history.push("/");
                    return;
                }
                setOtherProfile(data);
            });
    }, []);

    return (
        <>
            <CSSTransition
                in={transition}
                timeout={700}
                classNames="list-transition"
                appear
                exit
            >
                <div>
                    <div className="profileContainer">
                        <div className="profileRectangle"></div>
                        <div className="about">
                            <div>
                                <img
                                    src={
                                        otherProfile.profile_picture_url ||
                                        "../default.png"
                                    }
                                />
                            </div>
                            <h2>
                                {otherProfile.first} {otherProfile.last}
                            </h2>
                            <p>ABOUT ME</p>
                            <p>{otherProfile.bio}</p>
                            <FriendButton otherUserId={otherUserId} />
                        </div>
                    </div>

                    {/* <FriendsOtherProfile
                        otherUserId={otherUserId}
                    ></FriendsOtherProfile> */}
                </div>
            </CSSTransition>
        </>
    );
}
