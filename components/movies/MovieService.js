const movieModel = require("./MovieModel");

//Lấy danh sách phim
const getAllMovies = async (page, size) => {
  try {
    return await movieModel.find();
  } catch (error) {
    console.log("Get all movies error", error);
    throw error;
  }
};

//Xoá phim theo id
const deleteMovieById = async (id) => {
  try {
    await movieModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("Delete movie by id error", error);
    return false;
  }
};

//Thêm mới phim
const addNewMovie = async (
  tenPhim,
  daoDien,
  quocGia,
  thoiLuong,
  loaiPhim,
  dangPhim,
  ngayKhoiChieu,
  anhBia,
  moTa
) => {
  try {
    const newMovie = {
      tenPhim,
      daoDien,
      quocGia,
      thoiLuong,
      loaiPhim,
      dangPhim,
      ngayKhoiChieu,
      anhBia,
      moTa,
    };
    const p = new movieModel(newMovie);
    await p.save();
    return true;
  } catch (error) {
    console.log("Add new movie failed", error);
    return false;
  }
};

//Update phim
const updateMovie = async (
  id,
  tenPhim,
  daoDien,
  quocGia,
  thoiLuong,
  loaiPhim,
  dangPhim,
  ngayKhoiChieu,
  anhBia,
  moTa
) => {
  try {
    const movie = await movieModel.findById(id);
    if (movie) {
      movie.tenPhim = tenPhim ? tenPhim : movie.tenPhim;
      movie.daoDien = daoDien ? daoDien : movie.daoDien;
      movie.quocGia = quocGia ? quocGia : movie.quocGia;
      movie.thoiLuong = thoiLuong ? thoiLuong : movie.thoiLuong;
      movie.loaiPhim = loaiPhim ? loaiPhim : movie.loaiPhim;
      movie.dangPhim = dangPhim ? dangPhim : movie.dangPhim;
      movie.ngayKhoiChieu = ngayKhoiChieu ? ngayKhoiChieu : movie.ngayKhoiChieu;
      movie.anhBia = anhBia ? anhBia : movie.anhBia;
      movie.moTa = moTa ? moTa : movie.moTa;
      await movie.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update item failed", error);
    return false;
  }
};

//Lấy thông tin phim theo id
const getMovieById = async (id) => {
  try {
    return await movieModel.findById(id);
  } catch (error) {
    console.log("Get movieById error", error);
    return null;
  }
};

//Tìm kiếm phim theo tên
const searchMovieName = async (name) => {
  try {
    return await movieModel.find({
      name: { $regex: tenPhim, $options: "i" },
      // price: { $gte: 10, $lte: 2000 },
      // quantity: { $gt: 10 },
      //< 5 or >50
      // $or: [{ quantity: { $lt: 5 } }, { quantity: { $gt: 50 } }],
    });
  } catch (error) {
    console.log("Seach movie error ", error);
  }
  return null;
};

module.exports = {
  getAllMovies,
  deleteMovieById,
  addNewMovie,
  updateMovie,
  getMovieById,
};
