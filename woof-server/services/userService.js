const userRepository = require("../repositories/userRepository");

const getAllUserFriends = async (authId) => {
  return await userRepository.find({
    friends: { $in: "61daf0357d91c7a6c507feac" },
  });
};

module.exports = {
  getAllUserFriends,
};
