const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    BlogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    Comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestapms: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
