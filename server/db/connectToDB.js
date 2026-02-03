import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI;

if(!MONGO_URI) {
    throw new Error("MongoDB URI Missing");
}

let cached = global.mongoose || { conn: null };

const connectToDB = async () => {
    try {
        if(cached.conn) {
            return cached.conn;
        }
        const conn = await mongoose.connect(MONGO_URI);
        cached.conn = conn;
        global.mongoose = cached.conn;
        console.log("Connected to DB");
        return conn;
    } catch(error) {
        console.log("Database error: ",error.message);
        process.exit(1);
    }
}

export default connectToDB;