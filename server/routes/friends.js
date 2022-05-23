const { Router } = require("express");
const router = Router();
const {
    getFriendship,
    sendFriendship,
    acceptFriendship,
    removeFriendship,
    getFriendsAndReqs,
} = require("../../database/db");

router.get("/api/users_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;

    getFriendship(userId, parseInt(otherUserId))
        .then((data) => {
            if (!data) {
                res.json({ noFriendship: true });
                return;
            }
            res.json(data);
        })
        .catch((e) => console.log("error fetching friendship: ", e));
});

router.post("/api/send_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    sendFriendship(userId, parseInt(otherUserId)).then(() => {
        res.json({ message: "ok" });
    });
});
router.post("/api/accept_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    acceptFriendship(userId, parseInt(otherUserId)).then(() => {
        res.json({ message: "ok" });
    });
});
router.post("/api/remove_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    removeFriendship(userId, parseInt(otherUserId)).then(() => {
        res.json({ message: "ok" });
    });
});

router.get("/api/friends", (req, res) => {
    const { userId } = req.session;
    getFriendsAndReqs(userId).then((data) => {
        res.json(data);
    });
});

router.get("/api/friends/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;
    const { userId } = req.session
    getFriendship(userId, parseInt(otherUserId))
        .then((data) => {
            if (!data) {
                res.json({ noFriendship: true });
                return;
            }
            getFriendsAndReqs(otherUserId).then((data) => {
                console.log(data, otherUserId);
                res.json(data);
            });
        })
        .catch((e) => console.log("error fetching friendship: ", e));
    
});

module.exports = router;
