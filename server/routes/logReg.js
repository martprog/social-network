const { Router } = require("express");
const router = Router();
const {
    createUser,
    login,
} = require("../../database/db");

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({ succes: false });
        return;
    }

    login(email, password).then((user) => {
        if (!user) {
            res.json({ succes: false });
            return;
        }
        req.session.userId = user.id;
        res.json({ succes: true });
    });
});

router.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;

    if (!first || !last || !email || !password) {
        res.json({
            succes: false,
        });
        return;
    }
    createUser(first, last, email, password)
        .then((newUser) => {
            if (newUser) {
                req.session.userId = newUser.id;
                res.json({ succes: true });
            } else {
                res.json({ succes: false });
            }
        })
        .catch((e) => console.log("error creating user: ", e));
});




module.exports = router;