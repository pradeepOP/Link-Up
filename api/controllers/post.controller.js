import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import asyncHandler from "express-async-handler";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createPost = asyncHandler(async (req, res, next) => {
  const postImageLocalPath = req.file?.path;
  const postImage = await uploadOnCloudinary(postImageLocalPath);

  const post = await Post.create({
    userId: req.user.id,
    content: req.body.content,
    postImage: postImage?.url || "",
  });
  const populatedPost = await post.populate(
    "userId",
    "fullname profilePicture"
  );

  res.status(201).json(populatedPost);
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("userId").sort({ createdAt: -1 });
  res.status(200).json(posts);
});

export const getPostDetail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate(
    "userId",
    "fullname profilePicture"
  );
  if (!post) {
    return next(errorHandler(404, "Post not found"));
  }
  res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (post.userId.toString() !== req.user.id) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  await post.deleteOne();
  res.status(200).json({ message: "Post deleted successfully" });
});
