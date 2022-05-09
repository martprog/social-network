const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { createUser, login, reset } = require("../database/db");
const cryptoRandomString = require("crypto-random-string");
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

app.post("/login", (req, res)=>{
    const { email, password } = req.body;

    if(!email || !password){
        res.json({succes: false});
        return;
    }

    login(email, password).then((user)=>{
        if(!user){
            res.json({succes:false});
            return;
        }
        req.session.userId = user.id; 
        res.json({succes: true});
    });

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

app.post("/reset", (req, res)=>{
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    reset(email, secretCode).then(()=>{

    }).catch(e=>console.log(e))
});


app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
