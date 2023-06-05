const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const eventSchema = new Schema({
  id: { type: ObjectId },
  tenSuKien: { type: String },
  anhBiaSuKien: { type: String },
  noiDungSuKien: { type: String },
});

module.exports =
  mongoose.models.event || mongoose.model("event", eventSchema);
