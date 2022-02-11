const userService = require("./userService");
const postRepository = require("../repositories/postRepository");
const moment = require("moment");

const getAllFeedPosts = async (auth) => {
  const allFriends = await userService.getAllUserFriends(auth);
  const allFriendsPosts = allFriends.map((friend) => {
    friend.posts.map((post) => {
      post.timeOfCreation = moment(post.timeOfCreation)
        .startOf("hour")
        .fromNow();
    });
    return friend.posts;
  });
  const allFriendsPostsCombined = allFriendsPosts.concat.apply(
    [],
    allFriendsPosts
  );

  if (allFriendsPostsCombined.length > 0) {
    return await postRepository.findPostsById(allFriendsPostsCombined);
  }

  return [];
};

module.exports = {
  getAllFeedPosts,
};
