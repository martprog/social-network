const { Router } = require("express");
const router = Router();
const {
    reset,
    setNewPass,
    getUserByCode,
} = require("../../database/db");
const cryptoRandomString = require("crypto-random-string");
const { sendMail } = require("../../ses");



router.post("/reset", (req, res) => {
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });

    if (!email){
        res.json({message:'error'});
    }

    reset(email, secretCode)
        .then((data) => {
            if (!data) {
                res.json({ message: "error" });
                return;
            }
            sendMail(email, secretCode);
            console.log(data);
            res.json({ message: "ok" });
        })
        .catch((e) => console.log(e));
});

router.put("/reset", (req, res) => {
    const { code, password } = req.body;

    return getUserByCode(code).then((data) => {
        if (!data) {
            res.json({ message: "error" });
            return;
        }
        setNewPass(password, data.email).then((data) => {
            res.json({ message: "ok" });
        });
    });
});

module.exports = router;