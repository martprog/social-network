import { Component } from "react";

export default class ResetPass extends Component {
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
        fetch("/reset", {
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
                if (result.succes == true) {
                    location.reload();
                    this.setState({ error: false });
                }
            })
            .catch((e) => console.log("oops,", e));
    }

    render() {
        return (
            <>
                <div className="reset">
                    <h1>Reset Password</h1>
                    {this.state.error && (
                        <p className="wronglog">Oops, something went wrong!</p>
                    )}
                    <form className="form" onSubmit={this.handleSubmit}>
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
                        <button id="submitReg">Submit</button>
                    </form>
                    
                </div>
            </>
        );
    }
}
