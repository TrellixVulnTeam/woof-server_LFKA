const express = require("express");
const router = express.Router();
const postService = require("../services/postService");

router.get("/", async (req, res, next) => {
  const authId = req.params.id;
  const allFeedPosts = await postService.getAllFeedPosts(authId);

  res.json(allFeedPosts);
});

router.post("/", async (req, res, next) => {
  const authId = req.params.id;
  const { title, image } = req.body;
  const addedPost = await postService.addPost(authId, title, image);

  res.json(addedPost);
});

module.exports = router;
