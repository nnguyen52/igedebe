const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/auth", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res.json({ success: false, message: "Loggin attemp failed" });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Simple validation
  if (!username || !password)
    return res.json({
      success: false,
      message: "Missing username and/or password",
    });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        success: false,
        message: "Incorrect username or password",
      });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res.json({
        success: false,
        message: "Incorrect username or password",
      });

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//register route:
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.json({
      success: false,
      message: "please fill in username and password",
    });
  User.findOne({ username }).then(async (found) => {
    if (found)
      res.json({
        message: "username existed, please register again!",
        success: false,
      });
    else {
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        message: "register successfully!",
        success: true,
        accessToken,
      });
    }
  });
});
router.post("/updateAvatar", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.user._id },
    { $set: { avatar: req.body.imgURL } },
    { new: true },
    function (err, updatedUser) {
      // Done!
      res.json({ data: updatedUser });
    }
  );
});
module.exports = router;
