import { Component } from "react";

export default class Uploader extends Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        console.log('is submitting: ');
        e.preventDefault();

        const formData = new FormData(e.target);
       
        // formData.append("image", this.imageFile);
        

        fetch("/user/profile_picture", {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data after upload: ", data);
                this.props.onUpload(data.profile_picture_url);
            });
    }
    
    render() {
        return (
            <div className="modal">
                <div className="formUpload">
                    <h1>upload foto</h1>
                    <form onSubmit={this.onSubmit}>
                        <input
                            id="file-choose"
                            name="image"
                            type="file"
                            accept="image/*"
                        ></input>
                        <button id="submitPic">Upload Image!</button>
                    </form>
                    <div onClick={this.props.closeModal} id="closeBtn">
                        Close
                    </div>
                </div>
            </div>
        );
    }
        
    
}