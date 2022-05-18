const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
app.use(compression());
const cookieSession = require("cookie-session");
const logAndReg = require("./routes/logReg");
const resetPassword = require("./routes/resetPass");
const {
    getUserById,
    uploadProfilePic,
    updateBio,
    getLatestUsers,
    getUsersByQuery,
    getOtherUserProfile,
    getFriendship,
    sendFriendship,
    acceptFriendship,
    removeFriendship,
    getFriendsAndReqs,
} = require("../database/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("../s3");
const secrets = require("../secrets");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads")); //null for error. REMEMBER: Node Land!
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((randomId) => {
            callback(null, `${randomId}${path.extname(file.originalname)}`);
        });
    },
});
const uploader = multer({
    storage: storage,
    // dest: "uploads",
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: secrets.COOKIE_SECRET,
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

app.get("/user/me.json", (req, res) => {
    const { userId } = req.session;

    getUserById(userId).then((results) => {
        res.json(results);
    });
});

app.post(
    "/user/profile_picture",
    uploader.single("image"),
    s3.upload,
    (req, res) => {
        const { userId } = req.session;
        const { filename } = req.file;
        let url = `https://s3.amazonaws.com/spicedling/${filename}`;

        if (req.file) {
            uploadProfilePic(url, userId)
                .then((results) => {
                    console.log("results of upload: ", results);
                    res.json(results);
                })
                .catch((e) => console.log("error uploading: ", e));
        } else {
            res.json({
                succes: false,
            });
        }
    }
);

app.put("/user/profile_bio", (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;

    updateBio(bio, userId).then((results) => {
        res.json(results);
    });
});

app.get("/users", (req, res) => {
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

app.get("/api/users/:otherUserId", (req, res) => {
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

app.get("/api/users_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;

    getFriendship(userId, parseInt(otherUserId))
        .then((data) => {
            // console.log('data: ', data);
            if (!data) {
                res.json({ noFriendship: true });
                return;
            }
            res.json(data);
        })
        .catch((e) => console.log("error fetching friendship: ", e));
});

app.post("/api/send_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    sendFriendship(userId, parseInt(otherUserId)).then((data) => {
        res.json({ message: "ok" });
    });
});
app.post("/api/accept_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    acceptFriendship(userId, parseInt(otherUserId)).then((data) => {
        res.json({ message: "ok" });
    });
});
app.post("/api/remove_friendship/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const { otherUserId } = req.params;
    removeFriendship(userId, parseInt(otherUserId)).then((data) => {
        res.json({ message: "ok" });
    });
});

app.get("/api/friends", (req, res) => {
    const { userId } = req.session;
    getFriendsAndReqs(userId).then((data) => {
        res.json(data);
    });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
