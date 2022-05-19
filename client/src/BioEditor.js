import { Component } from "react";
import Profile from "./Profile";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editingBio: false };
        this.renderForm = this.renderForm.bind(this);
        this.isEditing = this.isEditing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.notEditing = this.notEditing.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const newBio = e.target.bio.value;
        fetch("/user/profile_bio", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: newBio,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.props.onBioUpload(data.bio);
                this.setState({ editingBio: false });
            });
    }

    renderForm() {
        return (
            <form onSubmit={this.onSubmit}>
                <textarea name="bio" defaultValue={this.props.bio}></textarea>
                <div className="textareaBtns">
                    <button className="btns">Done!</button>
                    <button
                        className="btns"
                        type="button"
                        onClick={this.notEditing}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }

    notEditing() {
        this.setState({ editingBio: false });
    }

    isEditing() {
        this.setState({ editingBio: !this.editingBio });
    }

    render() {
        const button =
            this.props.bio == "" || this.props.bio == null
                ? "Add info!"
                : "Edit";
        return (
            <div className="textContainer">
                {this.state.editingBio ? (
                    this.renderForm()
                ) : (
                    <div>
                        <p>{this.props.bio}</p>
                        <button
                            className="btns"
                            id="editBtn"
                            onClick={this.isEditing}
                        >
                            {button}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
