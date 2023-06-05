var express = require("express");
var router = express.Router();
const movieController = require('../../components/movies/MovieController');

// http://localhost:3000/api/movie/getAllMovies
router.get('/getAllMovies', async function(req, res, next) {
    try {
        const listMovies = await movieController.getAllMovies();
        return res.status(200).json({result: true, movies: listMovies});
    } catch(err) {
        return res.status(500).json({result: false, products: null});
    }
})

module.exports = router;