import { config } from "dotenv";
import mongoose from "mongoose";

config();

export const connectDB=async ()=>{
    try{
        const connection=await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connection Successful");
        return connection;
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

