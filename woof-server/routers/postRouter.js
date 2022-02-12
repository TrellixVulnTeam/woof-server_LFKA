const express = require("express");
const router = express.Router();
const postService = require("../services/postService");

router.get("/", async (req, res, next) => {
  const authId = req.params.id;
  const getAllFeedPosts = await postService.getAllFeedPosts(authId);

  res.json(getAllFeedPosts);
});

module.exports = router;
