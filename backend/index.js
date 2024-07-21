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

app.get("/delete/:id",async (req,res)=>{
    await PasswordDB.findByIdAndDelete(req.params.id);
    console.log("Data Deleted With ID " + req.params.id);
    res.redirect("/");
})

app.post("/", async (req, res) => {
    console.log("Hello");
    console.log(req.body);
    res.send(req.body);
    const { sitename, username, password, id } = req.body;

    await PasswordDB.create({
        passwordId: id,
        sitename,
        username,
        password,
        userID: 1,
    })
})

app.listen(PORT, () => {
    console.log("Listening to port number " + PORT);
})
