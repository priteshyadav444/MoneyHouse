const express = require("express");
const Member = require("../modal/Member");
const authMember = require("../middleware/authMember");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");

// api > /api/member/auth
//desc > login check return  user data require  token auth middle ware
//access > public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "enter all required field" });
  }

  Member.findOne({ email })
    .then((member) => {
      if (!member) return res.status(400).json({ msg: "User does't  exist" });

      bcrypt.compare(password, member.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Caradentials" });

        jwt.sign(
          { _id: member._id },
          process.env.SECRET_KEY,
          { expiresIn: 1100011 },
          (err, memberToken) => {
            if (err) throw err;
            res.json({
              memberToken,
              member: {
                _id: member._id,
                firstname: member.firstname,
                lastname: member.lastname,
                email: member.email,
                member: member.joined,
                register_date: member.register_date,
                walletbalance: member.walletbalance,
                creditbalance: member.creditbalance,
                imgurl: member.imgurl,
                withdrawnbalance: member.withdrawnbalance,
                wallettransaction: member.wallettransaction,
                housestrans: member.housestrans,
                housesjoined: member.housesjoined,
                notifications: member.notifications,
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
// api > /api/member/auth/load
//desc > get user data
//access > protected
router.get("/load", authMember, (req, res) => {
  Member.findById(req.member._id)
    .select("-password")
    .then((member) => res.json(member))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
