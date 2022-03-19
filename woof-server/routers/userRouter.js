const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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
    console.log("Error registering: ", error.message);
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await userService.login(userName, password);
    res.json(user);
  } catch (error) {
    console.log("Error logging in: ", error.message);
    res.sendStatus(401);
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
    console.log("Error searching: ", error);
  }
});

router.post("/add-friend/:friendName", async (req, res, next) => {
  try {
    const { friendName } = req.params;

    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);

    const user = await userService.findOne({
      name: decodedToken.userName,
      password: decodedToken.password,
    });

    const friendRes = await userService.findOne({
      name: friendName,
    });

    if (!friendRes._id) {
      res.sendStatus(404);
    }

    const addFriendRes = await userService.addFriend(friendRes._id, user);
    res.json(addFriendRes);
  } catch (error) {
    console.log("Error adding friend: ", error);
  }
});

router.get("/profile-data/:userName", async (req, res, next) => {
  try {
    const { userName } = req.params;
    const userProfileData = await userService.getUserProfileData(userName);

    res.json(userProfileData);
  } catch (error) {
    console.log("Error searching: ", error);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN_STAGING);

    const user = await userService.getUserDataByToken(decodedToken);
    res.json(user);
  } catch (error) {
    console.log("Error searching: ", error);
  }
});

module.exports = router;
