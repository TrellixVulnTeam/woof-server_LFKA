const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  posts: [mongoose.Schema.Types.ObjectId],
  friends: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("UserSchema", UserSchema, "users");
