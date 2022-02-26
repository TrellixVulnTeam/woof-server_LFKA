const express = require("express");
const router = express.Router();
const postService = require("../services/postService");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);
  const user = await userService.findOne({
    userName: decodedToken.userName,
    password: decodedToken.password,
  });

  const allFeedPosts = await postService.getAllFeedPosts(user);
  res.json(allFeedPosts);
});

router.post("/", async (req, res, next) => {
  const { title, image } = req.body;

  const token = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);
  const user = await userService.findOne({
    userName: decodedToken.userName,
    password: decodedToken.password,
  });

  const addedPost = await postService.addPost(user, title, image);
  res.json(addedPost);
});

module.exports = router;
