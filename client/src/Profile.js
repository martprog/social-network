import BioEditor from "./BioEditor";
import ProfilePic from "./ProfilePic";

export default function Profile({ first, last, bio, onBioUpload, profile_picture_url, openModal }) {
    return (
        <div className="profileContainer">
            <ProfilePic url={profile_picture_url} openModal={openModal} />
            <div >
                <h2>{first} {last}</h2>
                <p>About me</p>
                <BioEditor last={last} bio={bio} onBioUpload={onBioUpload} />
            </div>
        </div>
    );
}