import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contentText: { 
      type: String,
      required: true,
    },
    likes: [{
      type:String
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }],
  },
  {
    timestamps: true,
  }
);
     
const Post = mongoose.model("Post", postSchema);

export default Post;
