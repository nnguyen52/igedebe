const express = require("express");
const router = express.Router();
const User = require("../models/User");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const checkTokenLocalStorage = require("../middleware/verifyTokenCheckout");
//chekcout
//USER MUST LOGGED-IN
//LATER MUST verify token this endpoint!!!!!!
router.post("/checking", verifyToken, (req, res) => {
  const { username, gamesPurchased } = req.body;
  User.findOne({ username }).then(async (foundUser) => {
    if (foundUser) {
      await gamesPurchased.map((eachGame) => {
        foundUser.gamesPurchased.push(eachGame);
      });
      foundUser.gamesPurchased = [...new Set(foundUser.gamesPurchased)];
      await foundUser.save();
      res.json({
        success: true,
        message: "checkout successfully",
        cart: foundUser.gamesPurchased,
      });
    } else res.json({ success: false, message: "cant find user" });
  });
});
router.post("/getListGameCheckout", (req, res) => {
  axios
    .post(req.body.tokenLink)
    .then(async (result1) => {
      const headers = {
        Accept: "application/json",
        "Content-Type": "text/plain",
        "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
        Authorization: `Bearer ${result1.data.access_token}`,
      };
      await axios
        .post(`${process.env.apiURL}/games/getMultipleGames`, {
          headers: headers,
          IDsString: req.body.stringIDS,
        })
        .then((result) => {
          res.json({ data: result.data.data });
        });
    })
    .catch((error) => {
      console.log(error.message);
      console.log("there are some errors");
    });
});

router.post("/checkValidUser", checkTokenLocalStorage, async (req, res) => {
  await User.find({ _id: req.userId }).then((found) => {
    if (found) {
      // if found user => show modal checkout with Final review
      return res.json({ success: true, found, message: "user valid" });
    }
    //if not found user => open modal ask user to login;
    res.json({ success: false, message: "please login to proceed checkout!" });
  });
});
router.post("/finalCheckout", (req, res) => {
  const decoded = jwt.verify(req.body.userID, process.env.ACCESS_TOKEN_SECRET);
  User.findById(decoded.userId).then(async (user) => {
    let newUserCart = user.gamesPurchased.concat(req.body.cartItems);
    user.gamesPurchased = [...new Set(newUserCart)];
    await user.save();
    return res.json({ success: true, message: "finished check out", user });
  });
});
module.exports = router;
