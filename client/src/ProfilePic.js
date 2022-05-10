import { Component } from "react";

export default function ProfilePic (props) {
    
    return (
        <>
            <h2>aaaaaa</h2>
            <img
                src={props.url}
                
                onClick={props.openModal}
            />
        </>
    );
}