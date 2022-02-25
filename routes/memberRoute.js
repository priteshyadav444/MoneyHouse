const express = require("express");
const Member = require("../modal/Member");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const authMember = require("../middleware/authMember");
const Transaction = require("../modal/Transaction");
const { ObjectId } = require("bson");
// api > /api/member
//desc > register  member with hash password return on success token and memberdetails
//access > public
router.post("/", (req, res) => {
  const { firstname, lastname, password, email, imgurl } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Enter all required field" });
  }

  Member.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      } else {
        const intialcreditbalance = 0;
        const newmember = new Member({
          firstname,
          lastname,
          email,
          password,
          imgurl,
          creditbalance: 0,
          withdrawnbalance: 0,
          walletbalance: intialcreditbalance,
          notifications: {
            notificationcount: 1,
            messages: [
              {
                data: `Thanks For Joining MoneyHouse, Add Money and Bid House`,
                type: "ac",
              },
            ],
          },
        });

        //create salt & Hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newmember.password, salt, (err, hash) => {
            if (err) throw err;
            newmember.password = hash;

            newmember
              .save()
              .then((member) => {
                jwt.sign(
                  { _id: member._id },
                  process.env.SECRET_KEY,
                  { expiresIn: 1455555 },
                  (err, memberToken) => {
                    if (err) throw err;
                    res.json({
                      memberToken,
                      member: {
                        _id: member._id,
                        firstname: member.firstname,
                        lastname: member.lastname,
                        email: member.email,
                        imgurl: member.imgurl,
                        member: member.joined,
                        register_date: member.register_date,
                        walletbalance: member.walletbalance,
                        creditbalance: member.creditbalance,
                        withdrawnbalance: member.withdrawnbalance,
                        wallettransaction: member.wallettransaction,
                        housestrans: member.housestrans,
                        housesjoined: member.housesjoined,
                        notifications: member.notifications,
                      },
                    });
                  }
                );
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ msg: "Unable to Register" });
              });
          });
        });
      }
    })
    .catch((err) => {
      if (err)
        return res
          .status(400)
          .json({ msg: "Unable to Connect /Chack Internet Connection" });
    });
});
// api > /api/member/addhouses
//desc > add member in
//access > protected

router.post("/addhouses", authMember, (req, res) => {
  const memberid = req._id;
  const houseid = req.houseid;
  const housetotalround = req.housetotalround;
  const housepool = req.housepool;

  const newitemdata = { houseId, housepool, housetotalround };
  Member.updateOne(
    { _id: memberid },
    { $push: { housesjoined: newitemdata } },
    function (err, collection) {
      if (err) throw err;
      res.json(newitemdata);
    }
  );
});

// api > /api/member/notification/load
//desc > Notifiaction Load
//access > protected

router.get("/notification/load", authMember, (req, res) => {
  Member.findById(req.member._id)
    .select("-password")
    .then((member) => {
      res.json({
        notifications: member.notifications,
      });
    });
});

// api > /api/member/notification/click
//desc > On Notification Click
//access > protected

router.get("/notification/click", authMember, (req, res) => {
  Member.updateOne(
    { _id: req.member._id },
    { $set: { "notifications.notificationcount": 0 } },
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// api > /api/member/addmoney
//desc > On Notification Click
//access > protected

router.post("/addmoney", authMember, (req, res) => {
  const requestid = ObjectId();
  const memberid = req.member._id;
  const amounttoadd = req.body.amounttoadd;
  const membername = req.body.membername;

  const transdata = { memberid, amounttoadd, membername, requestid };

  Member.updateOne(
    { _id: memberid },
    {
      $inc: {
        "notifications.notificationcount": 1,
      },
      $push: {
        "notifications.messages": {
          data:
            "Pending Request of ₹" +
            Number(amounttoadd).toLocaleString("en-IN"),
          type: "pending",
          _id: requestid,
        },
        wallettransaction: {
          amount: amounttoadd,
          transtype: "pending",
          transfrom: "bank",
          _id: requestid,
        },
      },
    },
    function (err, result) {
      if (err) throw err;
      Transaction.updateOne(
        { _id: "606b66adc99ed4b46cacf328" },
        {
          $push: {
            pendingtransaction: transdata,
          },
        },
        function (err, result) {
          if (err) throw err;
        }
      );

      res.status(200).json({
        trans: { amount: amounttoadd, transtype: "pending", transfrom: "bank" },
      });
    }
  );
});
module.exports = router;
