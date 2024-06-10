import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = asyncHandler(async (req, res, next) => {
  const { fullname, username, email, password, confirmPassword } = req.body;
  if (!fullname || !username || !email || !password || !confirmPassword) {
    return next(errorHandler(400, "All fields are required"));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(errorHandler(409, "User with this email already exists"));
  }
  if (password !== confirmPassword) {
    return next(errorHandler(400, "Password did not match"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    fullname,
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const { password: pass, ...rest } = newUser._doc;
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json(rest);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  const validUser = await User.findOne({ email });
  if (!validUser) {
    return next(errorHandler(404, "User not found"));
  }
  const validpassword = bcryptjs.compareSync(password, validUser.password);
  if (!validpassword) {
    return next(errorHandler(400, "Invalid password"));
  }
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const { password: pass, ...rest } = validUser._doc;
  res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json(rest);
});

export const google = asyncHandler(async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        name.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      email,
      password: hashedPassword,
      fullname: name,
      // profilePicture: googlePhotoUrl,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password, ...rest } = newUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(rest);
  }
});
