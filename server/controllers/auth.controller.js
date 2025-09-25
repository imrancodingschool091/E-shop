import { User } from "../models/user.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { signAccessToken, signRefreshToken } from "../utils/Jwt.js";
import jwt from "jsonwebtoken";

// 🔹 Register (No changes needed)
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

// 🔹 Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials" });
  }

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  // 🔑 Cookie configuration
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    // FIX: Use "None" (capital N) for production cross-site cookies
    sameSite: isProduction ? "None" : "lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/", // Explicitly set path
  });

  // Return user without password
  const { password: _, ...userWithoutPassword } = user.toObject();

  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    user: userWithoutPassword,
  });
});

// 🔹 Refresh
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const isProduction = process.env.NODE_ENV === "production";
  
  // Define cookie options for consistency in setting/clearing
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    // FIX: Use "None" (capital N) for production cross-site cookies
    sameSite: isProduction ? "None" : "lax", 
    path: "/",
  };


  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No refresh token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // Verify user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      // Clear cookie if user is invalid (must use consistent attributes)
      res.clearCookie("refreshToken", cookieOptions); 
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const newAccessToken = signAccessToken(decoded.userId);
    const newRefreshToken = signRefreshToken(decoded.userId);

    // Set new refresh token (use base options and add maxAge)
    res.cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      accessToken: newAccessToken
    });
  } catch (error) {
    // Clear invalid cookie (must use consistent attributes)
    res.clearCookie("refreshToken", cookieOptions); 

    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
});

// 🔹 Logout
export const logout = asyncHandler(async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";

  // Define cookie options for consistency in clearing
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    // FIX: Use "None" (capital N) for production cross-site cookies
    sameSite: isProduction ? "None" : "lax", 
    path: "/",
  };

  res.clearCookie("refreshToken", cookieOptions); 

  res.json({
    success: true,
    message: "Logged out successfully"
  });
});

// 🔹 Get Profile (No changes needed)
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  res.json({
    success: true,
    user
  });
});