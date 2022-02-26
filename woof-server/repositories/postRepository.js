const PostSchema = require("../models/postSchema");

const find = async (condition) => {
  return await PostSchema.find(condition);
};

const findById = async (id) => {
  return await PostSchema.findById(id);
};

const findPostsByIds = async (postsToFind) => {
  return await PostSchema.find({ posts: { $in: postsToFind } }).lean();
};

const findPostsByUsersIds = async (usersIds) => {
  return await PostSchema.find({
    "author.id": { $in: usersIds },
  }).lean();
};

const addPost = async (user, title, image) => {
  const author = {
    name: user.name,
    image: user.image,
    id: user.id,
  };

  return await PostSchema.create({ author, title, image });
};

module.exports = {
  findById,
  find,
  findPostsByIds,
  findPostsByUsersIds,
  addPost,
};
