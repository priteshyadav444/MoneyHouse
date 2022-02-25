const jwt = require("jsonwebtoken");
require("dotenv").config();

function authAdmin(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ loadmsg: "Authorization Denied" });
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token Invalid" });
  }
}

module.exports = authAdmin;
