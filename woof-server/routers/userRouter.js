const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.post("/", async (req, res, next) => {
  try {
    const { userName, profileImage, password, confirmPassword } = req.body;
    const newUser = await userService.register(
      userName,
      profileImage,
      password,
      confirmPassword
    );
    res.json(newUser);
  } catch (error) {
    console.log("Error registering: ", error);
  }
});

module.exports = router;
