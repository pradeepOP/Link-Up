import asyncHandler from "express-async-handler";
import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const createComment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  const { body } = req.body;

  if (!body) {
    return next(errorHandler(400, "Comment body is required"));
  }
  const post = await Post.findById(postId);
  if (!post) {
    return next(errorHandler(404, "Post doesnot exits"));
  }

  const comment = await Comment.create({
    postId,
    userId,
    body,
  });
  const populatedComment = await comment.populate
    .populate("userId", "fullname profilePicture")
    .populate("postId", "content");

  res.status(201).json(populatedComment);
});

export const getCommentsForPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId }).populate(
    "userId",
    "username profilePicture"
  );
  res.status(200).json(comments);
});
