import { User } from "../models/user.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { signAccessToken, signRefreshToken } from "../utils/Jwt.js";
import jwt from "jsonwebtoken"

export const register=asyncHandler(async(req,res)=>{
  const {username,email,password}=req.body;
  if(!username||!email||!password) {
    return res.status(400).json({success:false,message:"all fields are required"});
  }

  const existingUser=await User.findOne({email});
  if(existingUser){
    return res.status(400).json({success:false, message:"user already exits"})
  };

  const user=await User.create({username,email,password})

  res.status(201).json({
    sucess:true,
    message:"user register successfully",
    user:user

  })
})

export const login=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({success:false,message:"all fields are required"});
  }

  const user=await User.findOne({email});
  if(!user){
    return res.status(400).json({success:false,message:"invailed credentials"});
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }

  const accessToken=signAccessToken(user._id);
  const refreshToken=signRefreshToken(user._id);


   res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });


  res.status(200).json({
    success:true,
    message:"login successfully",
    accessToken,
    user:user
    
  })

})


export const refresh=asyncHandler(async(req,res)=>{
  const token=req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    try {
      const decoded= jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
      const accessToken=signAccessToken(decoded.userId);
      res.json({accessToken})
      
    } catch (error) {
       res.status(401).json({ message: "Invalid refresh token" });
    }

})


export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});