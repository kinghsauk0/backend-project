import dotenv from "dotenv"

import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
    path: ".env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running ${process.env.PORT}`)
    })

    app.on("error",(error)=>{
        console.error("error", error)
        throw error
    })
})
.catch(err => console.error(`mongodb connect error: ${err}`))






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