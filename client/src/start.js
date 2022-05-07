import ReactDOM from "react-dom";
import Registration from "./registration";

//decide between logged-in or logged-out experience
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        
        if (!data.userId) {
            ReactDOM.render(<Registration />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <img src="/logo.png" />,
                document.querySelector("main")
            );
        }
    })
    .catch(e=>console.log(e));


