import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  logout,
  updateUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();
router.put(
  "/update/:userId",
  verifyToken,
  upload.single("profilePicture"),
  updateUser
);
router.post("/logout", logout);
router.get("/:userId", verifyToken, getUserProfile);

export default router;
