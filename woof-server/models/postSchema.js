const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  image: String,
  title: String,
  authorName: String,
  timeOfCreation: { type: Date, default: Date.now() },
  reactions: [
    {
      name: String,
      reaction: String,
    },
  ],
  comments: [
    {
      name: String,
      comment: String,
    },
  ],
});

module.exports = mongoose.model("PostSchema", PostSchema, "posts");
