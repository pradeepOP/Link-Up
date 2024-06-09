import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import uploadOnCloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";

export const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update "));
  }

  if (req.body.password && req.body.confirmPassword) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    if (req.body.password !== req.body.confirmPassword) {
      return next(errorHandler(400, "Password did not match"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const profilePictureLocalPath = req.file?.path;

  const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        bio: req.body.bio,
        password: req.body.password,
        ...(profilePicture && { profilePicture: profilePicture.url }),
      },
    },
    { new: true }
  );
  const { password: pass, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("access_token").status(200).json("User logged out");
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("-password");
  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  res.json(user);
});
