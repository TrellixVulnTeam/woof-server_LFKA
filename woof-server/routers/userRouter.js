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

router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await userService.login(userName, password);
    console.log("----asdasd--", user);
    res.json(user);
  } catch (error) {
    console.log("Error logging in: ", error);
  }
});

module.exports = router;
