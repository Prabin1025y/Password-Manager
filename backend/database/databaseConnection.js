// const mongoose = require('mongoose');
import mongoose from "mongoose";

const ConnectToDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Database Connected");
}

export default ConnectToDB;
