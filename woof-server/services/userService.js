const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");

const getAllUserFriends = async (authId) => {
  return await userRepository.find({
    friends: { $in: "61daf0357d91c7a6c507feac" },
  });
};

const register = async (name, password, image) => {
  const newUser = await userRepository.find({ name, password });
  console.log("---", newUser);
  if (newUser.length === 0) {
    const token = jwt.sign({ name, password }, "shhhhh");
    const newUser = await userRepository.register(name, token, image);
    return newUser;
  }
};

module.exports = {
  getAllUserFriends,
  register,
};
