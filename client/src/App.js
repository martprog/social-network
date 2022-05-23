import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import FindPeople from "./FindPeople";
import Main from "./Main";
import OtherProfile from "./OtherProfile";
import Friends from "./Friends";
import ChatMessages from "./ChatMessages";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            profile_picture_url: "./default.png",
            first: "",
            last: "",
            bio: "",
            clicked: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handlePicChange = this.handlePicChange.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioUpload = this.onBioUpload.bind(this);
        this.menuList = this.menuList.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        fetch("/user/me.json")
            .then((res) => res.json())
            .then((data) => {
                if (data.profile_picture_url) {
                    this.setState(data);
                } else {
                    this.setState({ first: data.first });
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

    onBioUpload(newBio) {
        this.setState({ bio: newBio });
    }

    menuList() {
        if (!this.state.clicked) {
            this.setState({ clicked: true });
        } else {
            this.setState({ clicked: false });
        }
    }

    renderList() {
        return (
            <>
                <CSSTransition
                    in={this.state.clicked}
                    timeout={400}
                    classNames="list-transition"
                    appear
                >
                    <div id="menus" onClose={this.menuList}>
                        <div>
                            <Link
                                style={{ textDecoration: "none" }}
                                onClick={this.menuList}
                                to="/find"
                            >
                                Homepage
                            </Link>
                        </div>
                        <div>
                            <Link
                                style={{ textDecoration: "none" }}
                                onClick={this.menuList}
                                to="/"
                            >
                                Edit your profile
                            </Link>
                        </div>
                        <div>
                            <a href="/logout">Logout</a>
                        </div>
                    </div>
                </CSSTransition>
            </>
        );
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <div
                        onClick={this.state.clicked ? this.menuList : () => {}}
                        className="wrapper"
                    >
                        <div className="header">
                            <img
                                onClick={this.menuList}
                                className="logo"
                                src="/peanut.png"
                            />
                            {this.state.clicked ? this.renderList() : ""}
                            <nav className="nav-wrapper">
                                <div>
                                    <Link
                                        to="/friends"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Friends
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/findusers"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Add friends
                                    </Link>
                                </div>
                                <div>
                                    <Link
                                        to="/chatroom"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Chat
                                    </Link>
                                </div>

                                {/* <h1>Welcome, {this.state.first}!</h1> */}
                                <div>
                                    <ProfilePic
                                        url={this.state.profile_picture_url}
                                        openModal={this.openModal}
                                    />
                                </div>
                            </nav>
                        </div>
                        {this.state.modalOn && (
                            <Uploader
                                // handlePicChange={this.handlePicChange}
                                onUpload={this.onUpload}
                                closeModal={this.closeModal}
                            />
                        )}
                        <div className="multi-wrapper">
                            <div className="wrapperRouter">
                                <Route path="/find">
                                    <Main
                                        {...this.state}
                                        onBioUpload={this.onBioUpload}
                                        openModal={this.openModal}
                                    />
                                </Route>
                                <Route exact path="/">
                                    <Profile
                                        {...this.state}
                                        onBioUpload={this.onBioUpload}
                                        openModal={this.openModal}
                                    />
                                </Route>
                                <Route path="/findusers">
                                    <FindPeople
                                        {...this.state}
                                        onBioUpload={this.onBioUpload}
                                        openModal={this.openModal}
                                    />
                                </Route>
                                <Route path="/users/:otherUserId">
                                    <OtherProfile />
                                </Route>
                                <Route path="/friends">
                                    <Friends />
                                </Route>
                                <Route path="/chatroom">
                                    <ChatMessages />
                                </Route>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
