const { Router } = require("express");
const router = Router();
const {
    getOtherUserProfile,
    getLatestUsers,
    getUsersByQuery,
    updateBio,
} = require("../../database/db");

router.put("/user/profile_bio", (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;

    updateBio(bio, userId).then((results) => {
        res.json(results);
    });
});

router.get("/users", (req, res) => {
    const search = req.query.search;
    const { userId } = req.session;

    if (!search) {
        getLatestUsers().then((users) => {
            res.json(users);
        });
        return;
    } else {
        getUsersByQuery(search, userId).then((users) => {
            res.json(users);
        });
    }
});

router.get("/api/users/:otherUserId", (req, res) => {
    const { otherUserId } = req.params;

    const { userId } = req.session;

    if (otherUserId == userId) {
        res.json({ error: true });
        return;
    }
    getOtherUserProfile(otherUserId).then((data) => {
        if (!data) {
            res.json({ error: true });
            return;
        }
        res.json(data);
    });
});

module.exports = router;
