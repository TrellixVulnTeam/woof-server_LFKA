const mongoose = require("mongoose");
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

module.exports = {
  findById,
  find,
  findPostsById,
};
