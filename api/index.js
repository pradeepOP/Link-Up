import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import { errorHandler } from "./utils/error.js";

dotenv.config({ path: "./.env" });

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/comments", commentRoutes);

app.use(errorHandler);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
