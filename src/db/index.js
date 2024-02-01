import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";


const connectDB = async () =>{
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MongoDB connected !! DB_NAME: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error("MongoDB Error connecting to",error);
        process.exit(1)
    }
}


export default connectDB