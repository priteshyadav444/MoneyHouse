const { ObjectId } = require("bson");
const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const MemberSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    imgurl: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    register_date: { type: Date, default: Date.now() },
    walletbalance: { type: Number, default: null },
    creditbalance: { type: Number, default: 0 },
    withdrawnbalance: { type: Number, default: 0 },
    wallettransaction: [
      {
        amount: { type: Number, default: null },
        transtype: { type: String, default: null },
        transfrom: { type: String, default: null },
        transto: { type: String, default: null },
        transid: { type: String, default: null },
        orderid: { type: String, default: null },
        transtime: { type: Date, default: Date.now() },
      },
    ],
    housesjoined: [
      {
        houseid: { type: Schema.Types.ObjectId, default: null },
        housepool: { type: Number, default: 0 },
        noofmember: { type: Number, default: 0 },
        noofroundcompleted: { type: Number, default: 0 },
        transtime: { type: Date, default: Date.now() },
        profitloss: { type: Number, default: 0 },
        fineamount: { type: Number, default: 0 },
        bidtaken: { type: Boolean, default: false },
      },
    ],
    notifications: {
      notificationcount: { type: Number, default: 0 },
      messages: [
        {
          data: { type: String, default: null },
          type: { type: String, default: null },
          houseid: { type: Schema.Types.ObjectId, default: null },
          notificationtime: { type: Date, default: Date.now() },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Member = moongoose.model("Member", MemberSchema);
module.exports = Member;
