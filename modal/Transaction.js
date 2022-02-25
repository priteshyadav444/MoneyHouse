const moongoose = require("mongoose");
const Schema = moongoose.Schema;
const { Decimal128 } = require("bson");

const TransactionSchema = new Schema(
  {
    balance: { type: Decimal128, default: null },
    mainbalance: { type: Decimal128, default: 0 },
    transaction: [
      {
        amount: { type: Decimal128, default: null },
        transtype: { type: String, default: null },
        transfrom: { type: String, default: null },
        transto: { type: String, default: null },
        transtime: { type: Date, default: Date.now() },
      },
    ],
    maintransaction: [
      {
        amount: { type: Decimal128, default: null },
        transtype: { type: String, default: null },
        transfrom: { type: String, default: null },
        transto: { type: String, default: null },
        transid: { type: String, default: null },
        transtime: { type: Date, default: Date.now() },
        orderid: { type: String, default: null },
      },
    ],
    pendingtransaction: [
      {
        amounttoadd: { type: Decimal128, default: null },
        memberid: { type: Schema.Types.ObjectId, default: null },
        membername: { type: String, default: null },
        requestid: { type: Schema.Types.ObjectId, default: null },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Transaction = moongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
