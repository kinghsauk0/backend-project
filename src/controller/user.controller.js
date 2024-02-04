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
        [fullname, email, username, password].some((val) => val?.trim() === "")
    ) {
        throw new ApiError(
            404,
            "Please fill all the fields"
        );
    }
    // check user is allrady registered
    const existerUser = User.findOne({
        $or: [{username},{email}]
    })

    if (existerUser){
        throw new ApiError(
            409,
            "User is alrady registered"
        );
    }
    // chect for images, check avter,
   const avterLocalPAth = req.files?.avatar[0]?.path
    const coverImageLocalPAth = req.files?.coverImage[0]?.path
    if (!avterLocalPAth) {
      throw new ApiError(
        400,
        "Please upload avter"
      );
    }
    // uploard them to  clouinary, avter
   const avter = await uploadOneCloudinary(avterLocalPAth)
   const coverImage = await uploadOneCloudinary(coverImageLocalPAth)
   if (!avter){
    throw new ApiError(
      400,
      "Please upload avter"
    );
   }
    // cheate user object -- create ectry
   const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        avatar: avter.url,
        coverImage: coverImage?.url || "",
        password,
    })
  
    // remove password token field from response
    const createatedUser =User.findById(user._id).select(
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

    return res.status(201).json(
        new ApiResponse(200,createatedUser,"user created")
    )
});

export default registerUser;
