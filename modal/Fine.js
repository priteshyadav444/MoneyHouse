const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const FineSchema = new Schema(
  {
    member_id: { type: Schema.Types.ObjectId },
    amount: { type: Number, default: null },
    trans_type: { type: String, default: null },
    trans_time: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Fine = moongoose.model("Member", FineSchema);
module.exports = Fine;
