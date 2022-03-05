const userService = require("./userService");
const postRepository = require("../repositories/postRepository");
const { default: mongoose } = require("mongoose");

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
    return updateReaction(post, data.reaction, user);
  }
};

const deletePost = async (user, postId) => {
  const post = await postRepository.findById(postId);
  if (String(post.author.id) === user.id) {
    return await postRepository.deletePost(post);
  }

  return {
    ok: false,
    message: "Unauthorized",
  };
};

const updateReaction = async (post, reaction, user) => {
  const reactionObject = {
    reaction,
    name: user.name,
  };

  const isReactionExistByUserIndex = post.reactions.findIndex(
    (postReaction) => postReaction.name === user.name && postReaction.reaction === reaction
  );

  if (isReactionExistByUserIndex > -1) {
    post.reactions.splice(isReactionExistByUserIndex, 1);
  } else {
    post.reactions.push(reactionObject);
  }

  return await postRepository.updatePost(post);
};

module.exports = {
  addPost,
  updatePost,
  getAllPosts,
  deletePost,
};
