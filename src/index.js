import dotenv from "dotenv"

import connectDB from "./db/index.js"

dotenv.config({
    path: ".env"
})

connectDB()






/*
import express from "express";
const app = express();
;(async() =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(err) => {
            console.error("error", err)
            throw err
        })

        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("error", error)
        throw error
    }
})() */