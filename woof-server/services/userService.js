const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUserFriends = async (friendsIds) => {
  return await userRepository.find({
    _id: { $in: friendsIds },
  });
};

const register = async (userName, profileImage, password, confirmPassword) => {
  const hashedPassword = await bcrypt.hash(password, 4);
  const existingUser = await userRepository.find({
    userName,
    password: hashedPassword,
  });

  if (existingUser.length === 0) {
    if (password === confirmPassword) {
      const registeredUser = await userRepository.register(userName, hashedPassword, profileImage);

      return {
        user: registeredUser,
        token: generateToken(userName, hashedPassword),
      };
    } else {
      return {
        ok: false,
        error: "Password and Confirm password don't match",
      };
    }
  } else {
    return {
      ok: false,
      error: "User already exists",
    };
  }
};

const login = async (userName, password) => {
  const existingUserRes = await userRepository.find({
    name: userName,
  });

  const existingUser = existingUserRes[0];

  if (existingUserRes.length > 0) {
    const isPasswordsMatch = await bcrypt.compare(password, existingUser?.password);

    if (isPasswordsMatch) {
      return {
        user: existingUser,
        token: generateToken(userName, existingUser.password),
      };
    }
  }

  return {
    ok: false,
    error: "Sorry, credentials do not match",
  };
};

const findUser = async (condition) => {
  return await userRepository.find(condition);
};

const findOne = async (condition) => {
  return await userRepository.findOne(condition);
};

const addFriend = async (friendId, user) => {
  if (!user.friends.includes(friendId)) {
    user.friends.push(friendId);
    return await userRepository.updateUser(user);
  }
  return {
    ok: false,
    message: "Already a friend",
  };
};

const generateToken = (userName, password) => {
  return jwt.sign({ userName, password }, process.env.AUTH_TOKEN_STAGING, { expiresIn: "1h" });
};

module.exports = {
  getAllUserFriends,
  register,
  login,
  findUser,
  findOne,
  addFriend,
};
