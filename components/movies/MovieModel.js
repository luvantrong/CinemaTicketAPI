const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
  id: { type: ObjectId },
  tenPhim: { type: String },
  daoDien: { type: String },
  quocGia: { type: String },
  thoiLuong: { type: String },
  loaiPhim: { type: String },
  dangPhim: { type: String },
  ngayKhoiChieu: { type: String },
  anhBia: { type: String },
  moTa: { type: String },
  giaVe: { type: Number },
});

module.exports = mongoose.models.movie || mongoose.model("movie", movieSchema);
