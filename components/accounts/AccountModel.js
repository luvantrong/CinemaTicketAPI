const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: Number, default: 1 },
  //1: user
  //100: admin
  address: { type: String },
  phone: { type: String },
  avatar: { type: String },
});

module.exports =
  mongoose.models.account || mongoose.model("account", accountSchema);
