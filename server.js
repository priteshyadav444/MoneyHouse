const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 4444;
const app = express();
const cron = require("node-cron");
app.use(express.json({ extended: false }));
const nodemailer = require("nodemailer");
require("dotenv").config();
const uri = process.env.MONGO_URI;
const houseSchema = require("./routes/houseSchemeRoute");
const member = require("./routes/memberRoute");
const admin = require("./routes/adminRoute");
const adminAuth = require("./routes/authAdminRoute");
const memberAuth = require("./routes/authMemberRoute");
const paymentRoute = require("./routes/paymentRoute");
const House = require("./modal/House");
const Member = require("./modal/Member");
const Transaction = require("./modal/Transaction");
const { ObjectId } = require("bson");
const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");

// app.use(function (req, res, next) {
//   res.setHeader(
//     "Content-Security-Policy",
//     "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self' *; style-src 'self' https://fonts.googleapis.com   ; frame-src 'self'  ; "
//   );
//   next();
// });

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err.message));

app.use("/api/house", houseSchema);
app.use("/api/member", member);
app.use("/api/member/auth", memberAuth);
app.use("/api/admin", admin);
app.use("/api/admin/auth", adminAuth);
app.use("/api", paymentRoute);

let transporter = nodemailer.createTransport({
  // offical email handler
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
cron.schedule("35 13 * * *", () => {
  console.log("Pre Bid Chacker");
});
cron.schedule("43 22 * * *", () => {
  console.log("Server Running:1st Phase "); //first phase only for housefull full (bidstart,payment desetting for new payment,chacking lastpayment if not done fine + entry,)

  House.find(
    { housefull: true, housecompleted: false },
    function (err, result) {
      if (err) throw err;

      result.forEach((doc) => {
        for (var indexEle = 0; indexEle < doc.members.length; indexEle++) {
          //payment request
          Member.updateOne(
            { _id: doc.members[indexEle].memberid },
            {
              $push: {
                "notifications.messages": {
                  data:
                    "Payment Request ₹" +
                    Number(doc.entryamount).toLocaleString("en-IN"),
                  type: "payment",
                  houseid: doc._id,
                },
              },
              $inc: { "notifications.notificationcount": 1 },
            },
            function (err, res) {
              if (err) throw err;
              console.log("Payment Request");
            }
          );
          //handling whose payment last payment not done
          if (doc.members[indexEle].paymentdone === false) {
            doc.members[indexEle].fineamount =
              doc.members[indexEle].fineamount + doc.entryamount; //add last fine charge and entry pool amount
            Member.updateOne(
              {
                _id: doc.members[indexEle].memberid,
                "housesjoined.houseid": doc._id,
              },
              {
                $inc: { "housesjoined.$.fineamount": doc.entryamount }, //add last fine charge and entry pool amount
              },
              function (err, res) {
                if (err) throw err;
              }
            );
          }
        }
        if (doc.noofroundcompleted + 1 == doc.members.length) {
          // Chacking That house Last Round
          House.updateOne(
            { _id: doc._id, housefull: true, housecompleted: false },
            {
              $set: {
                //payment status setting to false
                "members.$[].paymentdone": false,
              },
              bidding: false, //bidding Not Start
              paymentaccept: true,
            },
            function (err, res) {
              if (err) throw err;
              if (res) {
                console.log("House Last Round ");
              }
            }
          );
        } else if (doc.noofroundcompleted !== 0) {
          // Chacking that it is not house first Round
          House.updateOne(
            { _id: doc._id, housefull: true, housecompleted: false },
            {
              $set: {
                //payment status setting to false

                "members.$[].paymentdone": false,
              },
              bidding: true, //bidding Start
              paymentaccept: true,
            },
            function (err, res) {
              if (err) throw err;
              if (res) {
                console.log("House Regular Round");
              }
            }
          );
        } else {
          //last round
          House.updateOne(
            { _id: doc._id, housefull: true, housecompleted: false },
            {
              bidding: true, //bidding Start
              paymentaccept: true,
            },
            function (err, res) {
              if (err) throw err;
              if (res) {
                console.log("house First Round ");
              }
            }
          );
        }
        doc.save(function (err, res) {
          if (err) throw err;
          console.log("House Successfully Started First Round!!!");
        });
      });
    }
  );
});

cron.schedule("31 22 * * *", () => {
  console.log("Server Running:2nd Phase "); //Second round only STop bid and add fine amount 500 whose payment not done yet
  House.find(
    { housefull: true, housecompleted: false, bidding: true },
    function (err, result) {
      result.forEach((doc) => {
        doc.bidding = false; //stop bidding
        for (var indexEle = 0; indexEle < doc.members.length; indexEle++) {
          if (doc.members[indexEle].paymentdone === false) {
            doc.members[indexEle].fineamount =
              doc.members[indexEle].fineamount + 500;
            Member.updateOne(
              {
                _id: doc.members[indexEle].memberid,
                "housesjoined.houseid": doc._id,
              },
              {
                $inc: { "housesjoined.$.fineamount": 500 },
              },
              function (err, res) {
                if (err) throw err;
                console.log("Fined " + doc.members[indexEle].membarname);
              }
            );
          }
        }

        doc.save(function (err, result) {
          if (err) throw err;
          if (result) {
            console.log("Fine Intialize");
          }
        });
      });
    }
  );
});

cron.schedule("55 16 * * *", () => {
  console.log("Mail Update");
  //pre mail working status chacking
  let messageOptions = {
    from: "MoneyHouse <abhixxx047@gmail.com>",
    to: "priteshyadav444@gmail.com",
    subject: "Payment Notification ",
    text: "Payment For bid Winner Intialize ",
  };

  transporter.sendMail(messageOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Payment Mail Notified");
    }
  });
});

function TransactionFunc(memberid, amount, houseid) {
  //Transaction  to main bank account and member wallet account
  membertransData = {
    amount: amount,
    transtype: "credit",
    transfrom: "bank",
  };
  transData = {
    amount: amount,
    transtype: "debit",
    transfrom: "bank",
    transto: memberid,
  };
  Transaction.updateOne(
    //Transaction
    { _id: "606b66adc99ed4b46cacf328" },
    { $push: { transaction: transData }, $inc: { balance: -amount } },
    function (err, result) {
      if (err) throw err;
      console.log("Bank Payment Intialize");
      Member.updateOne(
        { _id: memberid },
        {
          $push: {
            wallettransaction: membertransData,
            "notifications.messages": {
              data:
                "You Won A House Pool Amount ₹" +
                Number(amount).toLocaleString("en-IN"),
              type: "credit",
              houseid: houseid,
            },
          },
          $inc: { walletbalance: amount, "notifications.notificationcount": 1 },
        },
        function (err, res) {
          if (err) throw err;
        }
      );
      console.log("Payment Done");
      Member.findOne({ _id: memberid }, function (err, res) {
        //congrats email to bidwinner
        if (err) throw err;
        if (res.email) {
          let messageOptions = {
            from: "MoneyHouse <abhixxx047@gmail.com>",
            to: res.email,
            subject: "Bid Winners",
            text:
              "Congrats " +
              res.firstname +
              ",You Won the Bid at INR " +
              Number(amount).toLocaleString("en-IN"),
          };

          transporter.sendMail(messageOptions, function (error, info) {
            if (error) {
              throw error;
            } else {
              console.log("Email successfully sent!");
            }
          });
        }
      });
    }
  );
}

cron.schedule("34 22 * * *", () => {
  console.log("Server Running:Final Phase "); //last phase
  House.find(
    {
      housefull: true,
      housecompleted: false,
      bidding: false,
      paymentaccept: true,
    },
    function (err, result) {
      if (err) throw err;
      //only for housefull,not housecompleted and  bidding should not be running
      result.forEach((doc) => {
        doc.noofroundcompleted = doc.noofroundcompleted + 1; // increment no of Round

        doc.bidding = false;
        //chacking total houseround completed or not
        if (doc.noofroundcompleted == doc.members.length) {
          doc.housecompleted = true;
          doc.paymentaccept = false;
        }

        const newcreditbalance =
          doc.lastbidder.amount / (doc.members.length - 1); // calculating credit balance

        for (var indexEle = 0; indexEle < doc.members.length; indexEle++) {
          if (
            doc.lastbidder.amount === 0 &&
            doc.lastbidder.membername === "" &&
            doc.members[indexEle].bidtaken == false
          ) {
            doc.lastbidder.memberid = doc.members[indexEle].memberid;
            doc.lastbidder.membername = doc.members[indexEle].membername;
          }

          if (
            doc.members[indexEle].memberid.toString() ===
            doc.lastbidder.memberid.toString()
          ) {
            // chacking for bidderwinner
            doc.members[indexEle].profitloss =
              -doc.lastbidder.amount + doc.members[indexEle].profitloss;
            doc.members[indexEle].creditbalance = 0;
            doc.members[indexEle].bidtaken = true;
            TransactionFunc(
              doc.lastbidder.memberid,
              doc.poolamount - doc.lastbidder.amount,
              doc._id
            ); //transaction debit to bank credit to bid winner
            Member.updateOne(
              { _id: doc.lastbidder.memberid, "housesjoined.houseid": doc._id },
              {
                $set: {
                  "housesjoined.$.profitloss": doc.members[indexEle].profitloss,
                  "housesjoined.$.bidtaken": true,
                },
                $inc: {
                  "housesjoined.$.noofroundcompleted": 1,
                },
              },
              function (err, res) {
                if (err) throw error;
                if (res) {
                  console.log("Bid Winner Table Updated");
                }
              }
            );
            console.log("Payment Intialize To:" + doc.lastbidder.membername);
          } else {
            doc.members[indexEle].profitloss =
              doc.members[indexEle].profitloss + newcreditbalance;
            doc.members[indexEle].creditbalance = newcreditbalance;
            console.log(indexEle);

            Member.updateOne(
              {
                _id: doc.members[indexEle].memberid,
                "housesjoined.houseid": doc._id,
              },
              {
                $set: {
                  "housesjoined.$.profitloss": doc.members[indexEle].profitloss,
                },
                $inc: {
                  "housesjoined.$.noofroundcompleted": 1,
                },
              },
              function (err, res) {
                if (err) throw err;
                if (res) {
                  console.log("Member Table Updated");
                }
              }
            );
          }
        }

        doc.bidwinners.push({
          ...doc.lastbidder,
          amount: doc.poolamount - doc.lastbidder.amount,
        });
        doc.paymentaccept = false;
        doc.lastbidder = { memberid: ObjectId(), membername: "", amount: 0 };
        doc.save(function (err, res) {
          if (err) throw err;
          if (res) {
            console.log("Bid Completed!!!");
          }
        });
      });
    }
  );
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(PORT, () => console.log(`Server Running At ${PORT}`));
