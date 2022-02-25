const PaytmChecksum = require("paytmchecksum");
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const authMember = require("../middleware/authMember");
const https = require("https");
// api/payment
var multiparty = require("multiparty");
const Member = require("../modal/Member");
const Transaction = require("../modal/Transaction");
router.post("/payment", authMember, (req, res) => {
  const memberid = req.member._id;
  const amounttoadd = req.body.amounttoadd;
  const membername = req.body.membername;

  var paytmParams = {};

  paytmParams.body = {
    requestType: "Payment",
    mid: process.env.MERCHANT_ID,
    websiteName: "WEB",
    orderId: uuidv4(),
    callbackUrl: process.env.CALLBACKURL + "/api/callback?uid=" + memberid,
    txnAmount: {
      value: amounttoadd,
      currency: "INR",
    },
    userInfo: {
      custId: memberid,
    },
  };
  PaytmChecksum.generateSignature(
    JSON.stringify(paytmParams.body),
    process.env.MERCHANT_KEY
  )
    .then(function (checksum) {
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      var options = {
        hostname: "securegw.paytm.in",

        port: 443,
        path:
          "/theia/api/v1/initiateTransaction?mid=" +
          process.env.MERCHANT_ID +
          "&orderId=" +
          paytmParams.body.orderId,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": post_data.length,
        },
      };

      var response = "";
      var post_req = https.request(options, function (post_res) {
        post_res.on("data", function (chunk) {
          response += chunk;
        });
        console.log(response);
        post_res.on("end", function () {
          const resData = JSON.parse(response);
          res.json({ resData, ...paytmParams.body });
        });
      });

      post_req.write(post_data);
      post_req.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/callback", async (req, res) => {
  const memberid = req.query.uid;

  const form = formidable({ multiples: true });
  // parse a file upload

  form.parse(req, (err, fields, file) => {
    if (err) throw err;
    console.log(fields);
    paytmChecksumfileds = fields.CHECKSUMHASH;

    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      process.env.MERCHANT_KEY,
      paytmChecksumfileds
    );
    console.log(isVerifySignature);
    if (isVerifySignature) {
      var paytmParams = {};
      paytmParams["MID"] = fields.MID;
      paytmParams["ORDERID"] = fields.ORDERID;

      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(paytmParams, process.env.MERCHANT_KEY)
        .then(function (checksum) {
          paytmParams["CHECKSUMHASH"] = checksum;

          var post_data = JSON.stringify(paytmParams);

          var options = {
            hostname: "securegw.paytm.in",

            port: 443,
            path: "/order/status",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };
          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", async function () {
              let result = JSON.parse(response);
              const txnId = result.TXNID;
              const odrId = result.ORDERID;
              const amount = result.TXNAMOUNT;
              const resData = await Transaction.findOne(
                {
                  "maintransaction.transid": txnId,
                },
                {
                  _id: 0,
                  maintransaction: { $elemMatch: { transid: txnId } },
                }
              );
              console.log(resData);
              if (resData) {
                console.log("Payment URL Reqirect Done ");
                console.log("Payment Status :" + result.STATUS);
                res.redirect(process.env.CALLBACKURL + `/wallet`);
              } else {
                if (result.STATUS === "TXN_SUCCESS") {
                  console.log("Payment Sucess!!");
                  await Transaction.updateOne(
                    { _id: process.env.DBKEY },
                    {
                      $inc: { mainbalance: amount },
                      $push: {
                        maintransaction: {
                          amount: amount,
                          transtype: "credit",
                          transto: memberid,
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );
                  await Member.updateOne(
                    { _id: memberid },
                    {
                      $inc: {
                        walletbalance: amount,
                        creditbalance: amount,
                        "notifications.notificationcount": 1,
                      },

                      $push: {
                        "notifications.messages": {
                          data:
                            "Payment Done  ₹" +
                            Number(amount).toLocaleString("en-IN"),
                          type: "credit",
                        },
                        wallettransaction: {
                          amount: amount,
                          transtype: "credit",
                          transfrom: "bank",
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );
                  res.redirect(process.env.CALLBACKURL + `/wallet`);
                } else if (result.STATUS === "TXN_FAILURE") {
                  console.log("Payment Failed!!");

                  await Transaction.updateOne(
                    { _id: process.env.DBKEY },
                    {
                      $push: {
                        maintransaction: {
                          amount: amount,
                          transtype: "failed",
                          transto: memberid,
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );

                  await Member.updateOne(
                    { _id: memberid },
                    {
                      $inc: {
                        "notifications.notificationcount": 1,
                      },
                      $push: {
                        "notifications.messages": {
                          data:
                            "Payment Failed ₹" +
                            Number(amount).toLocaleString("en-IN"),
                          type: "failed",
                          transid: txnId,
                        },
                        wallettransaction: {
                          amount: amount,
                          transtype: "failed",
                          transfrom: "bank",
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );

                  console.log("Payment Failed  :" + result.STATUS);
                  res.redirect(process.env.CALLBACKURL + `/wallet`);
                } else {
                  await Transaction.updateOne(
                    { _id: process.env.DBKEY },
                    {
                      $push: {
                        maintransaction: {
                          amount: amount,
                          transtype: "pending",
                          transto: memberid,
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );
                  await Member.updateOne(
                    { _id: memberid },
                    {
                      $inc: {
                        "notifications.notificationcount": 1,
                      },
                      $push: {
                        "notifications.messages": {
                          data:
                            "Payment Failed ₹" +
                            Number(amount).toLocaleString("en-IN"),
                          type: "pending",
                          transid: txnId,
                        },
                        wallettransaction: {
                          amount: amount,
                          transtype: "pending",
                          transfrom: "bank",
                          transid: txnId,
                          orderid: odrId,
                        },
                      },
                    }
                  );

                  console.log("Database Updated%!!");
                  console.log("Payment pending  :" + result.STATUS);
                  res.redirect(process.env.CALLBACKURL + `/wallet`);
                }
              }
            });
          });

          post_req.write(post_data);
          post_req.end();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Checksum Mismatched !!");
      res.redirect(process.env.CALLBACKURL + `/404`);
    }
  });
});
module.exports = router;
