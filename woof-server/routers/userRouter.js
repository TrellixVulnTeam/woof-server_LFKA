const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/register", async (req, res, next) => {
  try {
    const { name, image } = req.body;
    const allFeedPosts = await userService.register(name, image);
    res.json(allFeedPosts);
  } catch (error) {
    console.log("Error registering: ", error);
  }
});

router.post("/", async (req, res, next) => {
  const authId = req.params.id;
  const { title, image } = req.body;
  const addedPost = await postService.addPost(authId, title, image);

  res.json(addedPost);
});

module.exports = router;
