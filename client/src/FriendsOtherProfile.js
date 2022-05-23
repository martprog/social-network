// import { useEffect } from "react";

// import { useParams, useHistory } from "react-router";
// import { getOtherFriends } from "./redux/other-friends/slice";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserId } from "./redux/sessionId/slice";

// export default function FriendsOtherProfile({ otherUserId }) {
//     const dispatch = useDispatch();

//     const otherFriends = useSelector(
//         (state) =>
//             state.otherFriends &&
//             state.otherFriends.filter((friend) => friend.accepted === true)
//     );
//     // const history = useHistory();
    

//     console.log("otros amigos: ", otherFriends);

//     useEffect(() => {
        

//         fetch(`/api/friends/${otherUserId}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 dispatch(getOtherFriends(data));
//             });
//     }, []);

//     const handleOtherFriends = (
//         <>
//             {otherFriends.map((other) => {
//                 return (
//                     <div key={other.friendid}>
//                         {other.first}
//                         <img src={other.profile_picture_url} />
//                     </div>
//                 );
//             })}
//         </>
//     );

//     return (
//         <>
//             <div>{otherFriends.length >= 1 ? handleOtherFriends : ""}</div>
//         </>
//     );
// }
