const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  timeOfCreation: { type: Date, default: Date.now() },
  likes: [mongoose.Schema.Types.ObjectId],
  disLikes: [mongoose.Schema.Types.ObjectId],
  comments: [
    {
      id: mongoose.Schema.Types.ObjectId,
      likes: [mongoose.Schema.Types.ObjectId],
    },
  ],
});

module.exports = mongoose.model("PostSchema", PostSchema, "posts");
