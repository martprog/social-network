import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";
import { Link } from "react-router-dom";

export default function Profile({ first, last, bio, onBioUpload, profile_picture_url, openModal }) {
    return (
        <div className="profileContainer">
            <div className="profileRectangle" ></div>
            <ProfilePic url={profile_picture_url} openModal={openModal} />
            <div className="about">
                <h2>
                    {first} {last}
                </h2>
                <p>ABOUT ME</p>
                <BioEditor last={last} bio={bio} onBioUpload={onBioUpload} />
            </div>
            <Link to="/findusers">Find people</Link>
        </div>
    );
}