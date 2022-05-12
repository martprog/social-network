import { useState, useEffect } from "react";

export default function FindPeople() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        let abort = false;

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
                <>
                    <div className="usersFind" key={user.id}>
                        <img
                            src={user.profile_picture_url || "./default.png"}
                        />
                        <h3>{user.first}</h3>
                    </div>
                </>
            );
        });
    };

   

    const people = !search ? "These people just joined in" : "Your results";

    

    return (
        <>
            {/* {!onFriends? renderFriends(): searchFriends()} */}
            <div>
                <h1>Find people</h1>
                <p>Are you looking for someone?</p>
                <input onChange={handleChange}></input>
                <h2>{people}</h2>
                <div className="allResults">
                    {users.length >= 1 ? mappedUsers():<p>no matches found</p>}

                </div>
            </div>
        </>
    );
}