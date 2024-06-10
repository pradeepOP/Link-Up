import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  getCommentsForPost,
} from "../controllers/comment.controller.js";

const router = express.Router();

router
  .route("/:postId")
  .post(verifyToken, createComment)
  .get(verifyToken, getCommentsForPost);
router.delete("/:commentId", verifyToken, deleteComment);

export default router;
