import  Router  from "express";
import registerUser from "../controller/user.controller.js";
import upload from "../middlewares/multer.middlewares.js"

const userouter = Router()

userouter.route("/register").post(
    upload.fields([
       {
        name: "avater",
        maxCount: 1,
       },
       {
        name: "coverImade",
        maxCount: 1,
       }
    ]),
    registerUser)

export default userouter