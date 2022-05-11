import { Component } from "react";

// export default function ProfilePic (props) {
//     function onHover(){

//     }
//     return (
//         <>

//             <img
//                 id="profilePic"
//                 src={props.url}
//                 onClick={props.openModal}
//             />

//         </>
//     );
// }

export default class ProfilePic extends Component {
    constructor(props) {
        super(props);
        this.state = { hovered: false };
        this.onHover = this.onHover.bind(this);
        this.offHover = this.offHover.bind(this);
    }

    onHover() {
        this.setState({ hovered: true });
    }

    offHover() {
        this.setState({ hovered: false });
    }

    render() {
        return (
            <>
                
                <img
                    onMouseOver={this.onHover}
                    onMouseLeave={this.offHover}
                    className="profilePic"
                    src={this.props.url}
                    onClick={this.props.openModal}
                />
                {this.state.hovered && <p className="hovered">change foto</p>}
            </>
        );
    }
}
