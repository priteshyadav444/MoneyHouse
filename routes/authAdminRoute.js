const express = require("express");
const Admin = require("../modal/Admin");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authAdmin = require("../middleware/authAdmin");
const House = require("../modal/House");
// const auth = require("../middleware/auth");

// api > /api/admin/auth
//desc > login check return  user data require  token auth middle ware
//access > public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "enter all required field" });
  }

  Admin.findOne({ email })
    .then((admin) => {
      if (!admin) return res.status(400).json({ msg: "User does't  exist" });

      bcrypt.compare(password, admin.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Caradentials" });

        jwt.sign(
          { _id: admin._id },
          process.env.SECRET_KEY,
          { expiresIn: 11001100 },
          (err, adminToken) => {
            if (err) throw err;
            res.json({
              adminToken,
              admin: {
                _id: admin._id,
                firstname: admin.firstname,
                lastname: admin.lastname,
                email: admin.email,
              },
            });
          }
        );
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ msg: "Unable to Login/Chack Internet Connnection" });
    });
});

// api > /api/admin/auth/load
// desc > get user data
// access > protected

router.get("/load", authAdmin, (req, res) => {
  Admin.findById(req.admin._id)
    .select("-password")
    .then((admin) => res.json(admin))
    .catch((err) => console.log(err));
});
module.exports = router;
