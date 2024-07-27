import express from 'express';
import ConnectToDB from './database/databaseConnection.js';
import PasswordDB from './model/PasswordModel.js';
import cors from "cors";
import UserDB from './model/UserModel.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import isAuthenticated from './middleware/isAuthentecated.js';
const PORT = 3000;
dotenv.config();

const app = express();
app.use(cookieParser());

ConnectToDB();

app.use(cors({
    origin: process.env.ORIGIN_CORS, // Replace with your frontend URL
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.send({ loggedIn: true, userid: req.user.userId });
})

app.get("/login", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.send({ loggedIn: true, userid: req.user.userId });
})


app.get("/home/:id", isAuthenticated, async (req, res) => {
    const passwords = await PasswordDB.find({ userID: req.params.id })
    // console.log(req.cookies);
    // console.log(passwords);
    // console.log(req.user);
    const currentUser = await UserDB.findById(req.user.userId);
    res.send({ passwords, isAuthenticated: true, user: { fullname: currentUser.fullname, date: currentUser.userCreated } });
})

app.get("/delete/:id", isAuthenticated, async (req, res) => {
    await PasswordDB.findByIdAndDelete(req.params.id);
    console.log("Data Deleted With ID " + req.params.id);
    res.redirect("/home/" + req.user._id);
});

app.get("/logout", isAuthenticated, (req, res) => {
    res.clearCookie("token");
    res.send("Logged Out");
})



app.post("/edit/:id", isAuthenticated, async (req, res) => {
    const { sitename, username, password } = req.body;
    await PasswordDB.findByIdAndUpdate(req.params.id, {
        sitename,
        username,
        password
    })
    console.log("Data Updated With ID " + req.params.id);
    res.redirect("/home/" + req.user._id);
})

app.post("/home/:id", isAuthenticated, async (req, res) => {
    console.log("Data Inserted Successfully");
    const { sitename, username, password } = req.body;

    await PasswordDB.create({
        sitename,
        username,
        password,
        userID: req.params.id,
    })
    res.send(req.body);
})

app.post("/register", async (req, res) => {

    //console.log(req.body);
    const { fullname, username, password, email } = req.body;
    try {
        await UserDB.create({
            fullname,
            username,
            password: bcrypt.hashSync(password, 12),
            email,
            userCreated: new Date(Date.now()).toDateString()
        });
        res.send({ usercreated: true });
    } catch (error) {
        if (error.code === 11000) {
            res.send({ usercreated: false, duplicatedkey: Object.keys(error.keyValue)[0], errorcode: error.code })
        } else {
            console.log(error);
            res.send({ usercreated: false, errorcode: error })
        }
    }

})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserDB.findOne({
        $or: [
            { username },
            { email: username }
        ]
    });
    try {
        //console.log(user);
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                // console.log("going");
                const token = jsonwebtoken.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "10d" });
                res.cookie("token", token, {
                    httpOnly: true, // Ensures the cookie is not accessible via JavaScript
                    secure: false, // Ensures the cookie is sent only over HTTPS in production
                });
                // console.log(req.cookies);
                res.send({ userfound: true, error: false, fullname: user.fullname, userid: user._id });
            }
            else
                res.send({ userfound: false, error: false, incorrectfield: "password" });

        } else {
            res.send({ userfound: false, error: false, incorrectfield: "username" });
        }
    } catch {
        res.send({ userfound: false, error: true });
    }
})


app.listen(PORT, () => {
    console.log("Listening to port number " + PORT);
})
