// import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPass from "./ResetPassword";


export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Peanuuts!</h1>
            <img className="logo" src="/peanut.png" />
            <img className="pinot-1" src="/pinot.png" />
            <img className="pinot-2" src="/pinot2.png" />
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/reset">
                        <ResetPass />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}