const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
app.use(compression());
const cookieSession = require("cookie-session");
const logAndReg = require("./routes/logReg");
const resetPassword = require("./routes/resetPass");


app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
app.use(express.json());

app.use(logAndReg);
app.use(resetPassword);


app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});



app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
