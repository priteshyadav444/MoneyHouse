const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const AdminSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Admin = moongoose.model("Admin", AdminSchema);
module.exports = Admin;
