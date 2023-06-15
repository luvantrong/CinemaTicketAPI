const movieService = require("../movies/MovieService");

const getAllMovies = async (page, size) => {
  try {
    return await movieService.getAllMovies(page, size);
  } catch (error) {
    throw error;
  }
};

const deleteMovieById = async (id) => {
  try {
    return await movieService.deleteMovieById(id);
  } catch (error) {
    return false;
  }
};

const addNewMovie = async (
  tenPhim,
  daoDien,
  quocGia,
  thoiLuong,
  loaiPhim,
  dangPhim,
  ngayKhoiChieu,
  anhBia,
  moTa,
  giaVe
) => {
  try {
    return await movieService.addNewMovie(
      tenPhim,
      daoDien,
      quocGia,
      thoiLuong,
      loaiPhim,
      dangPhim,
      ngayKhoiChieu,
      anhBia,
      moTa,
      giaVe
    );
  } catch (error) {
    console.log("Add new movie failed", error);
    return false;
  }
};

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
  moTa,
  giaVe
) => {
  try {
    return await movieService.updateMovie(
      id,
      tenPhim,
      daoDien,
      quocGia,
      thoiLuong,
      loaiPhim,
      dangPhim,
      ngayKhoiChieu,
      anhBia,
      moTa,
      giaVe
    );
  } catch (error) {
    console.log("Update movie failed", error);
  }
};

const getMovieById = async (id) => {
  try {
    return await movieService.getMovieById(id);
  } catch (error) {
    console.log("Get movie by id failed", error);
  }
};

const searchMovieName = async (name) => {
  try {
    return await movieService.searchMovieName(name);
  } catch (error) {
    console.log("Seach movie by id failed", error);
  }
  return null;
};
const getAllMovies_v2 = async (page, size) => {
  try {
    return await movieService.getAllMovies_v2(page, size);
  } catch (error) {
    console.log("Get all movies error", error);
  }
};

module.exports = {
  getAllMovies,
  deleteMovieById,
  addNewMovie,
  updateMovie,
  getMovieById,
  searchMovieName,
  getAllMovies_v2,
};
