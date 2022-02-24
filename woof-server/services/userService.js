const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUserFriends = async (authId) => {
  return await userRepository.find({
    friends: { $in: "6217f373ab26125ed4192d50" },
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
      const registeredUser = await userRepository.register(
        userName,
        hashedPassword,
        profileImage
      );

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
    userName,
  });

  const existingUser = existingUserRes[0];

  const isPasswordsMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

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

const generateToken = (userName, password) => {
  return jwt.sign({ userName, password }, process.env.AUTH_TOKEN_STAGING);
};

module.exports = {
  getAllUserFriends,
  register,
  login,
};
