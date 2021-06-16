const jwt = require("jsonwebtoken");
const checkTokenLocalStorage = (req, res, next) => {
  if (!req.body.token)
    return res.json({ success: false, message: "token not found" });
  try {
    const decoded = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.json({ success: false, message: "malware token" });
  }
};
module.exports = checkTokenLocalStorage;
