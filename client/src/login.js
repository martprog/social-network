import { Component } from "react";
import { Link } from "react-router-dom";
import {
    Transition,
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from "react-transition-group";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {error: false, isOn: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            // () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        this.setState({error:false})
        e.preventDefault();
        fetch("/login", {
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
                    location.replace('/');
                    this.setState({ error: false });
                }
            })
            .catch((e) => console.log("oops,", e));
    }

    render() {
        return (
            <>
                {this.state.isOn && (
                    <CSSTransition
                        in={this.state.isOn}
                        timeout={500}
                        classNames="login-transition"
                        appear
                        
                    >
                        <div className="login">
                            <h1>Welcome Back!</h1>
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
                            <div className="containerLinks">
                                <p>
                                    Not a member? <Link to="/">Register</Link>
                                </p>
                                <p>
                                    <Link to="/reset">Reset Password</Link>
                                </p>
                            </div>
                        </div>

                    </CSSTransition>
                )}
            </>
        );
    }
}

