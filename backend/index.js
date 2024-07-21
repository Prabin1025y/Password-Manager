import express from 'express';
import ConnectToDB from './database/databaseConnection.js';
import PasswordDB from './model/PasswordModel.js';
import cors from "cors";
const PORT = 3000;

const app = express();

ConnectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const passwords = await PasswordDB.find();
    res.send(passwords);
})

app.get("/delete/:id", async (req, res) => {
    await PasswordDB.findByIdAndDelete(req.params.id);
    console.log("Data Deleted With ID " + req.params.id);
    res.redirect("/");
})

app.post("/edit/:id", async (req, res) => {
    const { sitename, username, password } = req.body;
    await PasswordDB.findByIdAndUpdate(req.params.id, {
        sitename,
        username,
        password
    })
    console.log("Data Updated With ID " + req.params.id);
    res.redirect("/");
})

app.post("/", async (req, res) => {
    console.log("Data Inserted Successfully");
    res.send(req.body);
    const { sitename, username, password } = req.body;

    await PasswordDB.create({
        sitename,
        username,
        password,
        userID: 1,
    })
})

app.listen(PORT, () => {
    console.log("Listening to port number " + PORT);
})
