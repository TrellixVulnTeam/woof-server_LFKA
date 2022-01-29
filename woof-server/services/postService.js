const userService = require("./userService");
const postRepository = require("../repositories/postRepository");

const getAllFeedPosts = async (auth) => {
  const allFriends = await userService.getAllUserFriends(auth);
  const allFriendsPosts = allFriends.map((friend) => friend.posts);
  const allFriendsPostsFlat = allFriendsPosts.concat.apply([], allFriendsPosts);
  console.log("-aaa----", allFriendsPostsFlat);

  const x = await postRepository.findPostsById(allFriendsPostsFlat);
  console.log("-----", x);
  return x;
};

module.exports = {
  getAllFeedPosts,
};
