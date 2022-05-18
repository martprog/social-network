import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Transition,
    CSSTransition,
    SwitchTransition,
    TransitionGroup,
} from "react-transition-group";

export default function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        let abort = false;
        console.log(window.location.pathname);

        fetch(`/users?search=${search}`)
            .then((res) => res.json())
            .then((results) => {
                if (!abort) {
                    setUsers(results);
                }
            });

        return () => (abort = true);
    }, [search]);

    const mappedUsers = () => {
        return users.map((user) => {
            return (
                <div key={user.id}>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/users/${user.id}`}
                    >
                        <div
                            className={
                                !search
                                    ? "usersFind"
                                    : location.pathname == "/find"
                                    ? "searchedFind"
                                    : "searchedAdd"
                            }
                        >
                            <img
                                src={
                                    user.profile_picture_url || "./default.png"
                                }
                            />
                            <h3>
                                {user.first} {user.last}
                            </h3>
                        </div>
                    </Link>
                </div>
            );
        });
    };

    const people = !search ? "These people just joined in" : "Your results";

    return (
        <>
            {/* {!onFriends? renderFriends(): searchFriends()} */}
            <CSSTransition
                in={search}
                timeout={700}
                classNames="list-transition"
                appear
                exit
            >
                <div className="find-megawrapper">
                    <h1>Find people</h1>
                    <div
                        className={
                            location.pathname == "/find"
                                ? "findWrapper"
                                : "profiles"
                        }
                    >
                        <p>Are you looking for someone?</p>
                        <input onChange={handleChange}></input>
                        <h2>{people}</h2>

                        <div
                            className={
                                !search
                                    ? "allResults"
                                    : location.pathname == "/find"
                                    ? "searched"
                                    : "new"
                            }
                        >
                            {users.length >= 1 ? (
                                mappedUsers()
                            ) : (
                                <p>no matches found</p>
                            )}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
}
