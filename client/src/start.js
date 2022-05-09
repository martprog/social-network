import ReactDOM from "react-dom";
// import Registration from "./registration";
import Welcome from "./Welcome";

//decide between logged-in or logged-out experience
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img className="logo" src="/peanut.png" />,
                document.querySelector("main")
            );
        }
    })
    .catch(e=>console.log(e));


