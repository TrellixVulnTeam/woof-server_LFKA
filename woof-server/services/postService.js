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

    for (let postIndex = 0; postIndex < allFriendsPosts.length; postIndex++) {
      allFriendsPosts[postIndex].timeOfCreation = moment(
        allFriendsPosts[postIndex].timeOfCreation
      )
        .startOf("hour")
        .fromNow();
    }

    console.log("----", allFriendsPosts);
    return allFriendsPosts;
  }

  return [];
};

module.exports = {
  getAllFeedPosts,
};
