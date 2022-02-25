const express = require("express");
const House = require("../modal/House");
const Member = require("../modal/Member");
const router = express.Router();
const getHouseMemberData = require("../middleware/getHouseMemberData");
const authMember = require("../middleware/authMember");
const Transaction = require("../modal/Transaction");
// api > api/house/
//desc > get all scheme
//access > public

router.get("/", (req, res) => {
  const data = req.headers["body"];
  if (data == "true") {
    House.find({}, {}, { sort: { createdAt: -1 } }, function (err, result) {
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json({ msg: err });
      }
    }).catch((err) =>
      res
        .status(400)
        .json({ msg: "Unable To Request/Chack Your Internet Connection" })
    );
  } else if (data == "false") {
    House.find(
      { housefull: data },
      {},
      { sort: { createdAt: -1 } },
      function (err, result) {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(400).json({ msg: err });
        }
      }
    );
  } else {
    console.log(data);
  }
});

//get joined schme dashbored data
router.get("/housemember", authMember, (req, res) => {
  const data = req.headers["body"];
  const mid = req.member._id;

  House.findOne({ _id: data }, function (err, result) {
    if (err) {
      res
        .status(400)
        .json({ msg: "Unable To Request/Chack Your Internet Connection" });
    }
    if (result) {
      const memberhouse = result.members.find((rs) => {
        if (rs.memberid.toString() == mid.toString()) {
          return rs;
        }
      });

      return res.status(200).json({ result, memberhouse });
    }
  });
});
// api > api/house/add
//desc > create new HouseScheme
//access > protected

router.post("/add", (req, res, next) => {
  const { poolamount, entryamount, noofmember } = req.body;

  if (!poolamount || !entryamount || !noofmember) {
    return res.status(400).json({ msg: "Enter all required field" });
  }

  const newHouse = new House({
    poolamount,
    entryamount,
    noofmember,
  });

  newHouse.save(function (err, result) {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
});
// api > /api/house/submitbid
//desc > bid submit member in
//access > protected

router.post("/submitbid", authMember, (req, res) => {
  const membername = req.body.name;
  const amount = req.body.amount;
  const memberid = req.member._id;

  const lastbiddata = { membername, memberid, amount };
  const houseid = req.body.houseid;
  Member.fineOne({ _id: memberid }, function (err, result) {
    if (err) throw err;

    House.findOne({ _id: houseid }, function (err, result) {
      if (err) throw err;

      if (
        result.lastbidder.amount + result.entryamount / 20 > amount ||
        amount === null ||
        amount === undefined
      ) {
        if (
          result.lastbidder.amount + result.entryamount / 20 >=
          result.poolamount / 2
        ) {
          res.status(400).json({
            msg: "Can't Placed Bid Amount Exceded Upto Limit",
          });
        } else {
          res.status(400).json({
            msg:
              "Bid Amount Should be Greater Than " +
              (result.lastbidder.amount + result.entryamount / 20 - 1),
          });
        }
      } else {
        if (result.poolamount / 2 < amount) {
          res.status(400).json({
            msg:
              "Bid Amount Should be Less Than Half of Pool Amount" +
              result.poolamount / 2,
          });
        } else {
          House.updateOne(
            { _id: houseid },
            { $set: { lastbidder: lastbiddata } },
            function (err, data) {
              if (err) {
                res.status(400).json({ msg: "Unable to Submit " });
              }

              // Notification
              result.members.map((memberdata) => {
                // message for other member
                if (
                  memberdata.memberid.toString() !==
                    lastbiddata.memberid.toString() &&
                  memberdata.bidtaken === false
                ) {
                  Member.updateOne(
                    { _id: memberdata.memberid },
                    {
                      $inc: {
                        "notifications.notificationcount": 1,
                      },
                      $push: {
                        "notifications.messages": {
                          data:
                            "Bid Placed ₹" +
                            Number(lastbiddata.amount).toLocaleString("en-IN") +
                            " By " +
                            lastbiddata.membername,
                          type: "bid",
                          houseid: houseid,
                        },
                      },
                    },
                    function (err, data) {
                      if (err) {
                        res.status(400).json({ msg: "Unable to Submit " });
                      }
                    }
                  );
                } else if (
                  memberdata.memberid.toString() ===
                  lastbiddata.memberid.toString()
                ) {
                  //message for member who placed a bid
                  Member.updateOne(
                    { _id: memberdata.memberid },
                    {
                      $inc: {
                        "notifications.notificationcount": 1,
                      },
                      $push: {
                        "notifications.messages": {
                          data:
                            "Bid Placed Successfully of ₹" +
                            Number(lastbiddata.amount).toLocaleString("en-IN"),
                          type: "bid",
                          houseid: houseid,
                        },
                      },
                    },
                    function (err, data) {
                      if (err) {
                        res.status(400).json({ msg: "Unable to Submit " });
                      }
                    }
                  );
                }
              });
              res.status(200).json({ lastbiddata });
            }
          );
        }
      }
    });
  });
});

// api > /api/house/addmember
//desc > add member in
//access > protected
router.post("/addmember", getHouseMemberData, (req, res) => {
  const memberid = req.member._id;
  const membername = req.body.name;
  const houseid = req.body.houseid;
  const housepool = req.body.housepool;
  const entryamount = req.body.entryamount;
  const walletbalance = req.body.balance - entryamount;

  const memberdata = { memberid, membername, paymentdone: true };
  const housedata = {
    houseid,
    housepool,
    profitloss: 0,
    noofroundcompleted: 0,
  };
  if (walletbalance >= 0) {
    House.findOne(
      { _id: houseid, "members.memberid": memberid },
      function (err, result) {
        if (err) throw err;
        if (result) {
          res.status(400).json({ msg: "Already Joined" });
        } else {
          House.findOne({ _id: houseid }, function (err, houseres) {
            if (err) throw err;
            if (houseres && houseres.members.length >= houseres.noofmember) {
              res
                .status(400)
                .json({ msg: "House Alredy Full/Plz Join Other House" });
            } else {
              let housefull = false;

              if (
                houseres &&
                houseres.members.length + 1 === houseres.noofmember
              ) {
                housefull = true;
              }
              House.updateOne(
                { _id: houseid },
                {
                  $set: { housefull: housefull },
                  $push: {
                    transaction: {
                      amount: entryamount,
                      membername: membername,
                      memberid: memberid,
                    },
                    members: memberdata,
                  },
                },
                function (err, result) {
                  if (err) throw err;

                  if (result) {
                    Member.updateOne(
                      { _id: memberid },
                      {
                        $inc: {
                          walletbalance: -entryamount,
                          "notifications.notificationcount": 1,
                        },
                        $push: {
                          "notifications.messages": {
                            data:
                              "You Joined A House Pool ₹" +
                              Number(housepool).toLocaleString("en-IN"),
                            type: "join",
                            houseid: houseid,
                          },
                          housesjoined: {
                            ...housedata,
                            noofmember: houseres.noofmember,
                          },
                          wallettransaction: {
                            amount: entryamount,
                            transtype: "debit",
                            transfrom: memberid,
                            transto: "bank",
                          },
                        },
                      },
                      function (err, mresult) {
                        if (err) throw err;
                        Transaction.updateOne(
                          { _id: "606b66adc99ed4b46cacf328" },
                          {
                            $inc: { balance: +entryamount },
                            $push: {
                              transaction: {
                                amount: entryamount,
                                transtype: "credit",
                                transfrom: memberid,
                              },
                            },
                          },
                          function (err, result) {
                            if (err) throw err;
                          }
                        );

                        res.status(200).json({
                          walletbalance,
                          trans: {
                            amount: entryamount,
                            transtype: "debit",
                            transfrom: memberid,
                            transto: "bank",
                          },
                          memberdata,
                          notificationdata: {
                            data:
                              "You Joined A House Pool ₹" +
                              Number(housepool).toLocaleString("en-IN"),
                            type: "join",
                            houseid: houseid,
                          },
                          housedata: {
                            ...housedata,
                            noofmember: houseres.noofmember,
                          },
                        });
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    );
  } else {
    res.status(400).json({
      msg: "Insufficient Balance",
    });
  }
});
// api > /api/house/payment
//desc > payment
//access > protected
router.post("/payment", authMember, (req, res) => {
  const memberid = req.member._id;
  const houseid = req.body.houseid;
  const membername = req.body.name;

  const entryamount = req.body.entryamount;
  const walletbalance = req.body.balance - entryamount;
  Member.fineOne({ _id: memberid }, function (err, result) {
    if (err) throw err;
    console.log("WalletBalance" + result.walletbalance);
    console.log("WalletBalance" + amount);
    if (walletbalance >= 0) {
      House.updateOne(
        { _id: houseid, "members.memberid": memberid },
        {
          $set: { "members.$.paymentdone": true },
          $push: {
            transaction: {
              amount: entryamount,
              membername: membername,
              memberid: memberid,
            },
          },
        },

        function (err, result) {
          if (err) throw err;

          if (result) {
            Member.updateOne(
              { _id: memberid },
              {
                $inc: { walletbalance: -entryamount },
                $push: {
                  wallettransaction: {
                    amount: entryamount,
                    transtype: "debit",
                    transfrom: memberid,
                    transto: "bank",
                  },
                },
              },
              function (err, mresult) {
                if (err) throw err;
                Transaction.updateOne(
                  { _id: "606b66adc99ed4b46cacf328" },
                  {
                    $inc: { balance: +entryamount },
                    $push: {
                      transaction: {
                        amount: entryamount,
                        transtype: "credit",
                        transfrom: memberid,
                      },
                    },
                  },
                  function (err, result) {
                    if (err) throw err;
                  }
                );
                res.status(200).json({
                  walletbalance,
                  trans: {
                    amount: entryamount,
                    transtype: "debit",
                    transfrom: memberid,
                    transto: "bank",
                  },
                });
              }
            );
          }
        }
      );
    } else {
      res.status(400).json({
        msg: "Insufficient Balance",
      });
    }
  });
});

// api > /api/house/update
//desc > Update Joined Houses and wallet Balance transaction
//access > protected
router.get("/update", authMember, (req, res) => {
  Member.findById(req.member._id)
    .select("-password")
    .then((member) => {
      res.json({
        housesjoined: member.housesjoined,
        walletbalance: member.walletbalance,
        creditbalance: member.creditbalance,
        withdrawnbalance: member.withdrawnbalance,
        wallettransaction: member.wallettransaction,
      });
    })
    .catch((err) => res.json({ msg: err }));
});
module.exports = router;
