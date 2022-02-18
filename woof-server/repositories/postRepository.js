const PostSchema = require("../models/postSchema");

const find = async (condition) => {
  return await PostSchema.find(condition);
};

const findById = async (id) => {
  return await PostSchema.findById(id);
};

const findPostsById = async (postsToFind) => {
  return await PostSchema.find({ posts: { $in: postsToFind } }).lean();
};

const addPost = async (title, image) => {
  return await PostSchema.create({ title, image });
};

module.exports = {
  findById,
  find,
  findPostsById,
  addPost,
};
