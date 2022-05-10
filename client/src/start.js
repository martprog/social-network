import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";

//decide between logged-in or logged-out experience
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <App />,
                document.querySelector("main")
            );
        }
    })
    .catch(e=>console.log(e));


