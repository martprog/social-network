import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./redux/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import { init } from "./socketInit";

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(immutableState.default())));

//decide between logged-in or logged-out experience
fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            init(store);
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        }
    })
    .catch((e) => console.log(e));
