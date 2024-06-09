import express from "express";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      minLength: [8, "Password must contain at least 8 characters"],
      required: true,
    },

    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
