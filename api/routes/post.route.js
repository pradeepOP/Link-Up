import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createPost,
  getPosts,
  getPostDetail,
  deletePost,
} from "../controllers/post.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(verifyToken, upload.single("postImage"), createPost)
  .get(getPosts);
router.get("/:postId", getPostDetail);
router.delete("/:postId", verifyToken, deletePost);
export default router;
