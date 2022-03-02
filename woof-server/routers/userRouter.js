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
    res.json(user);
  } catch (error) {
    console.log("Error logging in: ", error);
  }
});

router.get("/search/:searchTerm", async (req, res, next) => {
  try {
    const { searchTerm } = req.params;
    const searchRes = await userService.findUser({
      name: { $regex: searchTerm, $options: "i" },
    });

    res.json(searchRes);
  } catch (error) {
    console.log("Error logging in: ", error);
  }
});

module.exports = router;
