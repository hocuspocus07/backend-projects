import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //     message:"ok"
  // })
  // get user details from frontend
  //validation-not empty
  //check if user already exists-username or email
  //check for images and check for avatar
  //upload them on cloudinary,avatar
  //create user object- create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response
  const { fullName, email, username, password } = req.body;
  console.log(req.body);
  // console.log(email);
  // if(fullName===""){
  //     throw new ApiError(400,"fullname required");
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are compulsary");
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(400, "This user already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath=req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  console.log(req.files);
  // console.log(avatarLocalPath,coverImageLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar image to Cloudinary.");
  }

  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!coverImage && coverImageLocalPath) {
    throw new ApiError(400, "Failed to upload cover image to Cloudinary.");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while regitsering");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});
const generateAccessAndRefreshToken=async(userId)=>{
  try{
    const user=await User.findById(userId);
    const accessToken=user.generateAccessToken();
    const refreshToken=user.genrateRefreshToken();
    user.refreshToken=refreshToken;
    user.save({validateBeforeSave:false})
    return {accessToken,refreshToken};
  }catch(error){
    throw new ApiError(500,"something went wrong whle generating access and refresh token");
  }
}
const loginUser=asyncHandler(async (req,res)=>{
  //req body -> data
  //usernmae or email
  //find user
  //password check
  //access and refresh token
  //send cookie
  const {email,username,password}=req.body;
  if (!username||!email){
    throw new ApiError(500,"username or email is required")
  }
  const user=await User.findOne({
    $or:[{username},{email}]
  })
  if (!user){
    throw new ApiError(404,"User not found.");
  }
  const isPasswordValid=await user.isPasswordCorrect(password)
  if (!isPasswordValid){
    throw new ApiError(401,"Password is incorrect.");
  }
})
export { registerUser,loginUser };
