import { Component } from "react";
import { Link } from "react-router-dom";


export default class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitOne = this.handleSubmitOne.bind(this);
        this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
    }

    renderStepOne() {
        return (
            <div className="login">
                {this.state.error && (
                    <p className="wronglog">Oops, something went wrong!</p>
                )}
                <h1>Reset Password</h1>
                <p>Please enter your e-mail</p>
                <form className="form" onSubmit={this.handleSubmitOne}>
                    <input
                        onChange={this.handleChange}
                        placeholder="E-mail"
                        type="email"
                        name="email"
                    ></input>
                    <button id="submitReg">Send validation code</button>
                </form>
            </div>
        );
    }
    renderStepTwo() {
        return (
            <div className="login">
                {this.state.error && (
                    <p className="wronglog">Oops, something went wrong!</p>
                )}
                <form className="form" onSubmit={this.handleSubmitTwo}>
                    <label>Please write the code you recieved</label>
                    <input
                        onChange={this.handleChange}
                        placeholder="Code"
                        type="text"
                        name="code"
                    ></input>
                    <label>Please write your new password</label>
                    <input
                        onChange={this.handleChange}
                        placeholder="Password"
                        type="password"
                        name="password"
                    ></input>
                    <button id="submitReg">Confirm</button>
                </form>
            </div>
        );
    }
    renderStepThree() {
        return(
            <div className="login">
                <h1>Password succesfully reset!</h1>
                <Link to="/login">Log in!</Link>
            </div>
        );
    }

    renderStep() {
        switch (this.state.step) {
                        case 1:
                            return this.renderStepOne();

                        case 2:
                            return this.renderStepTwo();

                        case 3:
                            return this.renderStepThree();

                        default:
                            break;
        }
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            // () => console.log(this.state)
        );
    }

    handleSubmitOne(e) {
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
                // console.log("result: ", result);
                if(result.message == 'error'){
                    this.setState({error: true});
                    return;
                }
                this.setState({error: false});
                this.setState({step: 2});
            })
            .catch((e) => console.log("oops,", e));
    }

    handleSubmitTwo(e){
        e.preventDefault();
        fetch("/reset", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((res) => res.json())
            .then((result) => {
                if(result.message == 'error'){
                    this.setState({error: true});
                    return;
                }
                this.setState({error: false});
                this.setState({step: 3});
          
            })
            .catch((e) => console.log("oops,", e));
    }

    render() {
        return (
            <>
                <div className="reset">
                    {this.renderStep()}
                </div>
            </>
        );
    }
}
