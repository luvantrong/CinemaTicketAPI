const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ticketSchema = new Schema({
  id: { type: ObjectId },
  tenPhim: { type: String },
  giaVe: { type: Number },
  soGhe: { type: String },
  ngayXem: { type: String },
  suatXem: { type: String },
  bapRang: { type: String },
  soLuong: { type: Number },
  nguoiDung: { type: String },
  image: { type: String },
});

module.exports =
  mongoose.models.ticket || mongoose.model("ticket", ticketSchema);
