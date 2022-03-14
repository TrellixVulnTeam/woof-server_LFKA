const express = require("express");
const router = express.Router();
const postService = require("../services/postService");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    jwt.verify(token, process.env.AUTH_TOKEN_STAGING);
    const allFeedPosts = await postService.getAllPosts();

    res.json(allFeedPosts);
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      res.sendStatus(401);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, image, tags } = req.body;

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);
    const user = await userService.findOne({
      name: decodedToken.userName,
      password: decodedToken.password,
    });

    const addedPost = await postService.addPost(user, title, image, tags);
    res.json(addedPost);
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      res.sendStatus(401);
    }
  }
});

router.patch("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { data } = req.body;

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);

    const user = await userService.findOne({
      name: decodedToken.userName,
      password: decodedToken.password,
    });

    // NEED TO ADD LOGIC HERE TO VALIDATE POST BELONGS TO USER OR IF HE CAN (COMMENT || REACT)

    const addedPost = await postService.updatePost(user, postId, data);
    res.json(addedPost);
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      res.sendStatus(401);
    }
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);

    const user = await userService.findOne({
      name: decodedToken.userName,
      password: decodedToken.password,
    });

    const addedPost = await postService.deletePost(user, postId);
    res.json(addedPost);
  } catch (error) {
    if (error.message.includes("jwt expired")) {
      res.sendStatus(401);
    }
  }
});

module.exports = router;
