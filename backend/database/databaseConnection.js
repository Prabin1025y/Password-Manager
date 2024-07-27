// const mongoose = require('mongoose');
import mongoose from "mongoose";

const ConnectToDB = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected");
}

export default ConnectToDB;
