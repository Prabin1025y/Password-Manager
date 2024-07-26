import mongoose from "mongoose";
import { getDefaultLibFileName } from "typescript";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    fullname: {
        type: String,
    },
    password: {
        type: String,
    },
    userCreated:{
        type: String,
    }
});

const UserDB = mongoose.model("UserDB", userSchema);

export default UserDB;