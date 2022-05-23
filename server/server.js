const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const compression = require("compression");
const path = require("path");
app.use(compression());
const cookieSession = require("cookie-session");
const logAndReg = require("./routes/logReg");
const resetPassword = require("./routes/resetPass");
const friends = require("./routes/friends");
const users = require("./routes/users");
const {
    getUserById,
    uploadProfilePic,
    getAllMessages,
    createNewMsg,
    getUsersByIds,
} = require("../database/db");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("../s3");
const secrets = require("../secrets");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
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

const cookieSessionMiddleware = cookieSession({
    secret: secrets.COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(express.json());

app.use(logAndReg);
app.use(resetPassword);
app.use(friends);
app.use(users);

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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

const onlineUsers = {};

io.on("connection", async function (socket) {
    console.log(`socket with the id ${socket.id} is now connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    const userId = socket.request.session.userId;
    onlineUsers[socket.id] = userId;
    let newArr = Object.values(onlineUsers);
    let getArr = [...new Set(newArr)];

    const getOnlineUsers = await getUsersByIds(getArr);
    socket.emit("onlineUsers", getOnlineUsers);

    const chatMessages = await getAllMessages();

    socket.emit("chatMessages", chatMessages);

    socket.on("newMessage", async ({ text }) => {
        const sender = await getUserById(userId);
        const newMsg = await createNewMsg(userId, text);
        io.emit("newMessage", {
            first: sender.first,
            last: sender.last,
            isOnline: true,
            profile_picture_url: sender.profile_picture_url,
            ...newMsg,
        });
    });

    socket.on("disconnect", function () {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
