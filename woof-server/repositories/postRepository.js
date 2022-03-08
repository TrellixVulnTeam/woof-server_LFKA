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

const findPostsByUsersId = async (userId) => {
  return await PostSchema.find({
    "author.id": { $in: userId },
  });
};

const findAll = async () => {
  return await PostSchema.find({}).sort({ timeOfCreation: -1 }).lean();
};

const addPost = async (user, title, image, tags) => {
  const author = {
    name: user.name,
    image: user.image,
    id: user.id,
  };

  return await PostSchema.create({ author, title, image, tags });
};

const updatePost = async (post) => {
  return await post.save();
};

const deletePost = async (post) => {
  return await post.remove();
};

module.exports = {
  findById,
  find,
  findPostsByIds,
  findPostsByUsersId,
  addPost,
  findAll,
  updatePost,
  deletePost,
};
