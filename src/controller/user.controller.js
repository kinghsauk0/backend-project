import asncHandler from "../utits/asyncHandler.js";
import ApiError from "../utits/ApiError.js";
import User from "../models/user.model.js"
import uploadOneCloudinary from "../utits/Cloudinary.js"
import ApiResponse from "../utits/ApiResponse.js"

const registerUser = asncHandler(async (req, res) => {
    // get user details
    const { fullname, email, username, password } = req.body;
    console.log("email:", email);
    //validation
    if (
        [fullname, email, username, password].some(
            (field) => {
                console.log("field:", field)
                return field?.trim() === ""
            }
        )
    ) {
        throw new ApiError(404, "Please fill all the fields");
    }
    
    
    // check user is allrady registered
    const existerUser = await User.findOne({
        $or: [{username},{email}]
    })

    if (existerUser){
        throw new ApiError(
            409,
            "User is alrady registered"
        );
    }
    // chect for images, check avter,
    const avatarLocalPath = req.files?.avatar[0]?.path
    console.log(avatarLocalPath)
    
    if (!avatarLocalPath) {
      throw new ApiError(
        400,
        "Please upload avatar"
      );
    }
    // uploard them to  clouinary, avter
   const avatar = await uploadOneCloudinary(avatarLocalPath)
   if (!avatar){
    throw new ApiError(
      400,
      "Please upload avatar"
    );
   }
    // cheate user object -- create ectry
   const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        avatar: avatar.url,
        password,
    })
  
    // remove password token field from response
    const createatedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
 // check for user creation
    if (!createatedUser){
        throw new ApiError(
          500,
          "Something went wrong restoring"
        );
    }
    
    // reaten res

    res.status(201).json(
        new ApiResponse(
            201,
            "User created",
            createatedUser
        )
    )

});

export default registerUser;
