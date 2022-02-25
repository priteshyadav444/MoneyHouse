const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../modal/Admin");
const Member = require("../modal/Member");
const authMember = require("../middleware/authMember");
const Transaction = require("../modal/Transaction");

// api > /api/admin
//desc > register  admin with hash password return on success token and userdetails
//access > public
router.post("/", (req, res) => {
  const { firstname, lastname, email, password, policy } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "enter all required field" });
  }

  Admin.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: "User already exist" });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Unable to Connect" });
    });

  const newAdmin = new Admin({
    firstname,
    lastname,
    email,
    password,
  });
  //create salt & Hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
      if (err) throw err;

      newAdmin.password = hash;
      newAdmin
        .save()
        .then((user) => {
          //add transaction to main account
          jwt.sign(
            { _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: 1455555 },
            (err, token) => {
              if (err) throw err;
              res.json({
                adminToken,
                admin: {
                  _id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                },
              });
            }
          );
        })
        .catch((err) => {
          return res.status(400).json({ msg: "Unable to Register" });
        });
    });
  });
});

// api > /api/admin/getmember
// desc > get all member
// access > protected
router.get("/getmember", authMember, (req, res) => {
  Member.find({}, { firstname: 1, lastname: 1, email: 1, createdAt: 1 })

    .then((user) => res.json(user))
    .catch((err) => {
      console.log("Unable to Connect");
    });
});

// api > /api/admin/gettransaction
// desc > get all member
// access > protected
router.get("/loadtransaction", authMember, (req, res) => {
  Transaction.find(
    { _id: process.env.DBKEY },
    { pendingtransaction: 1, _id: 0 }
  )
    .then((result) => res.json(...result))
    .catch((err) => {
      console.log(err);
      console.log("Unable to Connect");
    });
});

// api > /api/admin/payment
// desc > Insert member
// access > protected
router.post("/payment", authMember, (req, res) => {
  const memberid = req.body.memberid;
  const amount = req.body.amount;
  const requestid = req.body.requestid;
  const paymentaction = req.body.paymentaction;
  if (memberid && amount && requestid && paymentaction == "approve") {
    Member.updateOne(
      {
        _id: memberid,
        "wallettransaction._id": requestid,
      },
      {
        $set: {
          "wallettransaction.$.transtype": "credit",
        },

        $inc: {
          walletbalance: amount,
          creditbalance: amount,
        },

        $pull: {
          "notifications.messages": { _id: requestid },
        },
      },
      function (err, res) {
        if (err) throw err;
        Member.updateOne(
          {
            _id: memberid,
          },
          {
            $inc: {
              "notifications.notificationcount": 1,
            },
            $push: {
              "notifications.messages": {
                data:
                  "Payment Approved ₹" + Number(amount).toLocaleString("en-IN"),
                type: "credit",
              },
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("Notification Updated!!");
          }
        );
        Transaction.updateOne(
          { _id: process.env.DBKEY },
          {
            $inc: {
              balance: -amount,
            },
            $pull: {
              pendingtransaction: { requestid: requestid },
            },
            $push: {
              transaction: {
                _id: requestid,
                amount: amount,
                transtype: "debit",
                transfrom: "bank",
                transto: memberid,
              },
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("Pending Payment Approved");
          }
        );
        console.log("Payment Done!");
      }
    );
    res.json({ requestid });
  } else if (memberid && amount && requestid && paymentaction == "deny") {
    Member.updateOne(
      {
        _id: memberid,
        "wallettransaction._id": requestid,
      },
      {
        $set: {
          "wallettransaction.$.transtype": "declined",
        },

        $pull: {
          "notifications.messages": { _id: requestid },
        },
      },
      function (err, res) {
        if (err) throw err;
        Member.updateOne(
          {
            _id: memberid,
          },
          {
            $inc: {
              "notifications.notificationcount": 1,
            },
            $push: {
              "notifications.messages": {
                data:
                  "Payment Declined By Admin ₹" +
                  Number(amount).toLocaleString("en-IN"),
                type: "declined",
              },
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("Notification Updated!!");
          }
        );
        Transaction.updateOne(
          { _id: process.env.DBKEY },
          {
            $pull: {
              pendingtransaction: { requestid: requestid },
            },
            $push: {
              transaction: {
                _id: requestid,
                amount: amount,
                transtype: "declined",
                transfrom: "bank",
                transto: memberid,
              },
            },
          },
          function (err, res) {
            if (err) throw err;
            console.log("Pending Declind");
          }
        );
        console.log("Payment Done!");
      }
    );
    res.json({ requestid });
  } else {
    res.json({ msg: "Payment Declined" });
  }
});

module.exports = router;
