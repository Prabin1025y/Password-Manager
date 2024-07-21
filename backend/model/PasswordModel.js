
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    passwordId: {
        type: String,
    },
    sitename: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    userID: {
        type: String,
    }
});

const PasswordDB = mongoose.model("PasswordDB", passwordSchema);

export default PasswordDB;