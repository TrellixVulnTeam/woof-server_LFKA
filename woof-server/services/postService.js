const userService = require("./userService");
const postRepository = require("../repositories/postRepository");
const moment = require("moment");

const getAllFeedPosts = async (userId) => {
  const friends = await userService.getAllUserFriends(userId);

  if (friends.length === 0) {
    return [];
  }

  const friendsIds = friends.map((friend) => friend._id);
  const posts = await postRepository.findPostsByUsersIds(friendsIds);

  posts.map(
    (post) =>
      (post.timeOfCreation = moment(post.timeOfCreation)
        .startOf("hour")
        .fromNow())
  );

  return posts;
};

const addPost = async (user, title, image) => {
  return await postRepository.addPost(user, title, image);
};

module.exports = {
  getAllFeedPosts,
  addPost,
};
