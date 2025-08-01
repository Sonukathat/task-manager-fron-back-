const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log("DB connected successfully...");
    } catch (error) {
        console.error("DB connection failed...");
    }
};

module.exports = connectDB;
