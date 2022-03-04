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

  const isPasswordsMatch = await bcrypt.compare(password, existingUser.password);

  if (existingUserRes.length === 0 || !isPasswordsMatch) {
    return {
      ok: false,
      error: "Sorry, credentials do not match",
    };
  } else {
    return {
      user: existingUser,
      token: generateToken(userName, existingUser.password),
    };
  }
};

const findUser = async (condition) => {
  return await userRepository.find(condition);
};

const findOne = async (condition) => {
  return await userRepository.findOne(condition);
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
};
