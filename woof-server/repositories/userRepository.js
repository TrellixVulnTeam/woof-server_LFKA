const UserSchema = require("../models/UserSchema");

const find = async (condition) => {
  return await UserSchema.find(condition);
};

const findOne = async (condition) => {
  return await UserSchema.findOne(condition);
};

const findById = async (id) => {
  return await UserSchema.findById(id);
};

const register = async (name, password, image) => {
  return await UserSchema.create({ name, password, image });
};

module.exports = {
  findById,
  find,
  register,
  findOne,
};
