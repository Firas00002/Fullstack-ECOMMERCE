const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const secret = config.get("secret");

const verifyAuth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json({ msg: "please login to access this resources" });

  try {
    const decoded = jwt.verify(token, secret);
    console.log(new Date(decoded.iat * 1000).toString());
    if (!decoded) return res.status(401).json({ msg: "invalid token" });

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "not authorized" });
    else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(401).json({ msg: "expired token" });

  }
};

module.exports = verifyAuth;
