const express = require("express");
const router = express.Router();
const postService = require("../services/postService");

router.get("/:id", async (req, res, next) => {
  const auth = req.params.id;
  const getAllFeedPosts = await postService.getAllFeedPosts(auth);

  res.json(getAllFeedPosts);
});

module.exports = router;
