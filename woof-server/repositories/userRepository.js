const UserSchema = require("../models/UserSchema");

const find = async (condition) => {
  return await UserSchema.find(condition);
};

const findById = async (id) => {
  return await UserSchema.findById(id);
};

module.exports = {
  findById,
  find,
};
