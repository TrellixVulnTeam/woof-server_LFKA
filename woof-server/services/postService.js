const userService = require("./userService");
const postRepository = require("../repositories/postRepository");
const moment = require("moment");

const getAllFeedPosts = async (authId) => {
  const allFriends = await userService.getAllUserFriends(authId);
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

module.exports = {
  getAllFeedPosts,
};
