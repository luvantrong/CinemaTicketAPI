const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ticketSchema = new Schema({
  id: { type: ObjectId },
  tenPhim: { type: String },
  giaVe: { type: Number},
  soGhe: { type: String},
  ngayXem: { type: String },
  suatXem: { type: String },
  bapRang: { type: ObjectId , ref: "popcorn"},
  soLuong: {type: Number},
});

module.exports =
  mongoose.models.ticket || mongoose.model("ticket", ticketSchema);
