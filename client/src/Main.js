import { useState, useEffect } from "react";
import Profile from "./Profile";
import FindPeople from "./FindPeople";
import { Link } from "react-router-dom";

export default function Main ({ first, last, bio, onBioUpload, profile_picture_url, openModal }) {
    return(
        <div className="mainWrapper">
            <div className="profileWrapper">
                <h1>Your Profile</h1>
                <Profile
                    first = {first}
                    last = {last}
                    onBioUpload = {onBioUpload}
                    profile_picture_url = {profile_picture_url}
                    openModal = {openModal}
                    bio = {bio}
                    // onBioUpload={this.onBioUpload}
                    // openModal={this.openModal}
                />
            </div>
            
            
            <FindPeople
                    
                // onBioUpload={this.onBioUpload}
                // openModal={this.openModal}
            />
            
        </div>
    );
}