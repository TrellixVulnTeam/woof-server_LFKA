const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

const getAllUserFriends = async (authId) => {
  return await userRepository.find({
    friends: { $in: "61daf0357d91c7a6c507feac" },
  });
};

const register = async (userName, profileImage, password, confirmPassword) => {
  const existingUser = await userRepository.find({ userName, password });

  if (existingUser.length === 0) {
    if (password === confirmPassword) {
      const token = jwt.sign({ userName, password }, "shhhhh");

      const newUser = await userRepository.register(
        userName,
        token,
        profileImage
      );
      return newUser;
    } else {
      return {
        ok: false,
        error: "Password and Confirm password don't match",
      };
    }
  }
};

module.exports = {
  getAllUserFriends,
  register,
};
