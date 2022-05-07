import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.succes == false) {
                    this.setState({ error: true });
                }
                if (result.succes == true){
                    location.reload();
                    this.setState({ error: false });
                }
            })
            .catch((e) => console.log("oops,", e));
    }

    render() {
        return (
            <div>
                <h1>This is Registration</h1>
                {this.state.error && <p>Oops, something went wrong!</p>}
                <form  className="registration" onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        placeholder="First Name"
                        type="text"
                        name="first"
                    ></input>
                    <input
                        onChange={this.handleChange}
                        placeholder="Last Name"
                        type="text"
                        name="last"
                    ></input>
                    <input
                        onChange={this.handleChange}
                        placeholder="E-mail"
                        type="email"
                        name="email"
                    ></input>
                    <input
                        onChange={this.handleChange}
                        placeholder="Password"
                        type="password"
                        name="password"
                    ></input>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
