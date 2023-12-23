import Post from "../Models/postSchema.js";
import Comment from "../Models/commentSchema.js";
import User from "../Models/userSchema.js";
import jwt from "jsonwebtoken";

export const createPosts = async (req, res) => {
  try {
    const { contentText, userId } = req.body;
    if (!contentText || contentText.trim().length === 0) {
      const error = new Error("Share your thoughts, please.");
      error.statusCode = 400;
      throw error;
    }
    const post = await Post.create({
      userId,
      contentText,
    });

    res.status(200).json({ message: "Posted successfully", post });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const allPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("userId");

    if (!allPosts || allPosts.length === 0) {
      const error = new Error("No posts found");
      error.statusCode = 404;
      throw error;
    }

    const reversedPosts = allPosts.reverse();

    res.status(200).json({ allPosts: reversedPosts });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postComment, userCommentId, postId } = req.body;
    if (!postComment || postComment.trim().length === 0) {
      const error = new Error("Comment required");
      error.statusCode = 404;
      throw error;
    }
    const newComment = new Comment({
      postComment,
      userId: userCommentId,
      postId,
    });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const postId = req.query.id;
    const postComments = await Comment.find({ postId: postId }).populate(
      "userId"
    );
    res.status(200).json(postComments);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const token = req.cookies.userjwt;
    if (!token) {
      const error = new Error("Unauthorized - Missing JWT");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET);

    const postId = req.body.postId;
    const userId = decodedToken.userId;

    if (!postId) {
      const error = new Error("postId is required");
      error.statusCode = 400;
      throw error;
    }

    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const likedIndex = post.likes.findIndex((like) => like.includes(userId));

    if (likedIndex === -1) {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({
        message: "Post liked successfully",
      });
    } else {
      post.likes.splice(likedIndex, 1);
      await post.save();
      res.status(200).json({
        message: "Post unliked successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
