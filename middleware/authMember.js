const jwt = require("jsonwebtoken");
require("dotenv").config();

function authMember(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ loadmsg: "Authorization Denied" });
  try {
    //verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.member = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token Invalid" });
  }
}

module.exports = authMember;
