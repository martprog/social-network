import { Component } from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            profile_picture_url:
                "./default.png",
            first: "",
            last: "",
            bio: "",
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handlePicChange = this.handlePicChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioUpload = this.onBioUpload.bind(this);
    }

    componentDidMount() {
        fetch("/user/me.json")
            .then((res) => res.json())
            .then((data) => {
                
                if(data.profile_picture_url){
                    this.setState(data);
                    
                }else{
                    this.setState({first: data.first});
                }
                
            });
    }

    openModal() {
        
        this.setState({ modalOn: true });
    }

    closeModal(e) {
        console.log(e.target);
        
        this.setState({ modalOn: false });
    }

    onUpload(picUrl) {
        
        this.setState({ modalOn: false, profile_picture_url: picUrl });   
    }

    handlePicChange(e) {
        
        this.setState({ picFile: e.target.value });
    }

    onBioUpload(newBio){
        this.setState({bio: newBio});
    }

    render() {
        console.log(this.state);
        return (
            <>
                <div className="wrapper">

                    <div className="header">
                        <img className="logo" src="/peanut.png" />
                        <h1>Welcome, {this.state.first}!</h1>
                        <ProfilePic
                            url={this.state.profile_picture_url}
                            openModal={this.openModal}
                        />
                    </div>
                    <h1>Your Profile</h1>
                    <Profile {...this.state} onBioUpload={this.onBioUpload} openModal={this.openModal}/>
                    {this.state.modalOn && (
                        <Uploader
                            // handlePicChange={this.handlePicChange}
                            onUpload={this.onUpload}
                            closeModal={this.closeModal}
                        />
                    )}
                </div>
            </>
        );
    }
}
