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
  const populatedComment = await Comment.findById(comment._id)
    .populate("userId", "username profilePicture")
    .populate("postId", "content");

  res.status(201).json(populatedComment);
});

export const getCommentsForPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId })
    .populate("userId", "username profilePicture")
    .sort({ createdAt: -1 });
  res.status(200).json({ result: comments.length, comments });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const userId = req.user.id;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(errorHandler(404, "Comment not found"));
  }
  const post = await Post.findById(comment.postId);
  if (
    comment.userId.toString() !== userId &&
    post.userId.toString() !== userId
  ) {
    return next(errorHandler(403, "Not authorized to delete this comment"));
  }
  await comment.deleteOne();
  res.status(200).json({ message: "comment deleted successfully" });
});
