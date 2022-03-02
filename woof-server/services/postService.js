const userService = require("./userService");
const postRepository = require("../repositories/postRepository");

const getAllPosts = async () => {
  return await postRepository.findAll();
};

const addPost = async (user, title, image, tags) => {
  return await postRepository.addPost(user, title, image, tags);
};

const updatePost = async (user, postId, data) => {
  const properties = Object.keys(data);
  const post = await postRepository.findById(postId);

  // ======== SHOULD USE A MAP HERE LIKE SO:

  // const props = {
  //   "reactions": {
  //     action() => {
  //       const newReaction = {
  //         reaction,
  //         name,
  //       };
  //       post.reactions.push(newReaction);

  //       return await postRepository.updatePost(post);
  //     }
  //   }
  // }

  if (properties.includes("reaction")) {
    return addReaction(post, data.reaction, user);
  }
};

const addReaction = async (post, reaction, user) => {
  const reactionObject = {
    reaction,
    name: user.name,
  };

  post.reactions.push(reactionObject);

  return await postRepository.updatePost(post);
};

module.exports = {
  addPost,
  updatePost,
  getAllPosts,
};
