import express from "express";
import {
    createPosts,allPosts
} from "../Controllers/postController.js";
const homeRouter = express.Router();
homeRouter.get("/allPosts",allPosts)
homeRouter.post("/createPosts", createPosts);
export default homeRouter;
