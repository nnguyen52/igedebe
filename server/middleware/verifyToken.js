const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("UserAuthorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
