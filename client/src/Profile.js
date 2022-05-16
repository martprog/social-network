import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
import { useState } from "react";
import {
    Transition,
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from "react-transition-group";

export default function Profile({
    first,
    last,
    bio,
    onBioUpload,
    profile_picture_url,
    openModal,
}) {
    const [inProp, setProp] = useState(true);
    return (
        <CSSTransition
            in={inProp}
            timeout={700}
            classNames="profile-transition"
            appear
        >
            <div className="profileContainer">
                <div className="profileRectangle"></div>
                <ProfilePic url={profile_picture_url} openModal={openModal} />
                <div className="about">
                    <h2>
                        {first} {last}
                    </h2>
                    <p>ABOUT ME</p>
                    <BioEditor
                        last={last}
                        bio={bio}
                        onBioUpload={onBioUpload}
                    />
                </div>
            </div>
        </CSSTransition>
    );
}
