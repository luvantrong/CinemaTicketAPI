var express = require("express");
var router = express.Router();
const movieController = require("../../components/movies/MovieController");

// http://localhost:3000/api/movie/getAllMovies
// Lấy danh sách phim
router.get("/getAllMovies", async function (req, res, next) {
  try {
    const listMovies = await movieController.getAllMovies();
    return res.status(200).json({ result: true, movies: listMovies });
  } catch (err) {
    return res.status(500).json({ result: false, movies: null });
  }
});

// http://localhost:3000/api/movie/searchMovieByName?name=
// tìm phim theo tên
router.get("/searchMovieByName", async (req, res, next) => {
  try {
    const { name } = req.query;
    const movie = await movieController.searchMovieName(name);
    console.log(name);
    return res.status(200).json({ result: true, movie: movie });
  } catch (error) {
    return res.status(500).json({ result: false, movie: null });
  }
});

module.exports = router;
