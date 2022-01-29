const userRepository = require("../repositories/userRepository");

const getAllUserFriends = async (auth) => {
  const authId = auth;
  return await userRepository.find({ friends: { $in: authId } });
};

module.exports = {
  getAllUserFriends,
};
