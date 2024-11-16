import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "../constant.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(`${DB_URI}${DB_NAME}`);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database Connection Failed", error.message);
        console.log(error.name, error.message);
        process.exit(1);
    }
}