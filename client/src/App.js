import { Component } from "react";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            profile_picture_url: "",
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
                
                this.setState(data);
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
                    <h1>Hola {this.state.first}</h1>
                    {/* <img className="logo" src="/peanut.png" /> */}
                    <ProfilePic
                        url={this.state.profile_picture_url}
                        openModal={this.openModal}
                    />
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
