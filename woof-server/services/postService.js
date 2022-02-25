const userService = require("./userService");
const postRepository = require("../repositories/postRepository");
const moment = require("moment");

const getAllFeedPosts = async (userId) => {
  const allFriends = await userService.getAllUserFriends(userId);
  const allFriendsPosts = allFriends.map((friend) => friend.posts);
  const allFriendsPostsCombined = allFriendsPosts.concat.apply(
    [],
    allFriendsPosts
  );

  if (allFriendsPostsCombined.length > 0) {
    const allFriendsPosts = await postRepository.findPostsById(
      allFriendsPostsCombined
    );

    allFriendsPosts.map((post) => {
      post.timeOfCreation = moment(post.timeOfCreation)
        .startOf("hour")
        .fromNow();

      return post;
    });

    return allFriendsPosts;
  }

  return [];
};

const addPost = async (title, image) => {
  return await postRepository.addPost(title, image);
};

module.exports = {
  getAllFeedPosts,
  addPost,
};
