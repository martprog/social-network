const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { createUser } = require("../database/db");
app.use(compression());
const cookieSession = require("cookie-session");




app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);
app.use(express.json());


app.get("/user/id.json", (req, res) => { 
    res.json({ userId: req.session.userId });
});


app.get("*", function (req, res) {
    
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});



app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;
    
    if (!first || !last || !email || !password) {
        res.json( {
            succes: false,
        });
        return;
    }
    createUser(first, last, email, password)
        .then((newUser) => {
            if(newUser){
                req.session.userId = newUser.id;
                res.json({succes: true});
            }else{
                res.json({succes:false})
            }
            
        })
        .catch((e) => console.log("error creating user: ", e));
    
});


app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
