const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const popcornSchema = new Schema({
  id: { type: ObjectId },
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  content:{ type: String},
});

module.exports =
  mongoose.models.popcorn || mongoose.model("popcorn", popcornSchema);
