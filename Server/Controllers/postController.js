import Post from "../Models/postSchema.js";

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
