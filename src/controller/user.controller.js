import asncHandler from "../utits/asyncHandler.js";


const registerUser = asncHandler( async (req, res) => {
    res.status(200).json({
        massage: "fuck you"
    })
})

export default registerUser