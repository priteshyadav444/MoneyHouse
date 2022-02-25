const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const HouseSchema = new Schema(
  {
    poolamount: { type: Number, required: true },
    entryamount: { type: Number, required: true },
    noofmember: { type: Number, required: true },
    noofroundcompleted: { type: Number, default: 0 },
    creditbalance: { type: Number, default: 0 },
    paymentaccept: { type: Boolean, default: false },
    housecompleted: { type: Boolean, default: false },
    bidding: { type: Boolean, default: false },
    lastbidder: {
      membername: { type: String, default: "" },
      memberid: {
        type: Schema.Types.ObjectId,
        default: "60776ae11d1a2304b4abf193",
      },
      amount: { type: Number, default: 0 },
    },
    bidwinners: [
      {
        membername: { type: String, default: null },
        memberid: { type: Schema.Types.ObjectId, dafault: null },
        date: { type: Date, default: Date.now() },
        amount: { type: Number, default: null },
      },
    ],
    transaction: [
      {
        membername: { type: String, default: null },
        memberid: { type: String },
        amount: { type: Number, default: null },
      },
    ],
    housefull: { type: Boolean, default: false },
    members: [
      {
        memberid: { type: Schema.Types.ObjectId, default: null },
        paymentdone: { type: Boolean, default: false },
        membername: { type: String, default: null },
        joinedtime: { type: Date, default: Date.now() },
        creditbalance: { type: Number, default: 0 },
        fineamount: { type: Number, default: 0 },
        bidtaken: { type: Boolean, default: false },
        profitloss: { type: Number, default: 0 },
      },
    ],

    biddingdate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

const House = moongoose.model("House", HouseSchema);
module.exports = House;
