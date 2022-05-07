import { Component } from "react";

export default class Counter extends Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            username: "desconocido",
        };
        // this.incrementCount = this.incrementCount.bind(this) => alternative to arrow function on onClick
        this.updateUsername = this.updateUsername.bind(this);
    }

    incrementCount() {
        this.setState(
            {
                count: this.state.count + 1,
            },
            
        );
    }

    updateUsername(e) {
        this.setState(
            {
                username: e.target.value,
            },
            () => console.log(this.state)
        );
    }

    componentDidMount(){
        console.log('mounted');
    }

    componentDidUpdate(){
        console.log('updaaa');
    }

    render() {
        return (
            <section>
                <h3>Welcome {this.state.username}</h3>
                <p>Currently value is {this.state.count}</p>
                <button onClick={() => this.incrementCount()}>Click me</button>
                <div>
                    <p>PLease enter name</p>
                    <input
                        value={this.state.username}
                        onChange={this.updateUsername}
                        type="text"
                    ></input>
                </div>
            </section>
        );
    }
}
