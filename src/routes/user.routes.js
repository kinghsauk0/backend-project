import  Router  from "express";
import registerUser from "../controller/user.controller.js";
import upload from "../middlewares/multer.middlewares.js"

const userRouter = Router()

userRouter.route("/register").post(
    upload.fields([
       {
        name: "avatar",
        maxCount: 1,
       }
    ]),
    registerUser)

export default userRouter