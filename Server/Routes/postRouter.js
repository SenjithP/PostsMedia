import express from "express";
import {
  createPosts,
  allPosts,
  commentPost,
  getPostComments,
  likePost
} from "../Controllers/postController.js";
const homeRouter = express.Router();
homeRouter.get("/allPosts", allPosts);
homeRouter.post("/createPosts", createPosts);
homeRouter.post("/createComment", commentPost);
homeRouter.get("/getPostComments",getPostComments)
homeRouter.post("/likePost",likePost)

export default homeRouter;
