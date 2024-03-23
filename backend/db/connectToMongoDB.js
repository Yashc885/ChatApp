import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGO;
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("Connected successfully to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;
