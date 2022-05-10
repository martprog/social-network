import { Component } from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            profile_picture_url:
                "./default.png",
            first: "",
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handlePicChange = this.handlePicChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
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

    closeModal() {
        
        this.setState({ modalOn: false });
    }

    onUpload(picUrl) {
        
        this.setState({ modalOn: false, profile_picture_url: picUrl });   
    }

    handlePicChange(e) {
        
        this.setState({ picFile: e.target.value });
    }

    render() {
        return (
            <>
                <div className="header">
                    <img className="logo" src="/peanut.png" />
                    <h1>Welcome, {this.state.first}!</h1>
                    <ProfilePic
                        url={this.state.profile_picture_url}
                        openModal={this.openModal}
                    />
                </div>
                {this.state.modalOn && (
                    <Uploader
                        // handlePicChange={this.handlePicChange}
                        onUpload={this.onUpload}
                        closeModal={this.closeModal}
                    />
                )}
            </>
        );
    }
}
