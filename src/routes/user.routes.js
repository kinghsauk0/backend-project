import  Router  from "express";
import registerUser from "../controller/user.controller.js";

const userouter = Router()

userouter.route("/register").post(registerUser)

export default userouter