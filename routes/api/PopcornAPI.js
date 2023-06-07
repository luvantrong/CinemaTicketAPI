var express = require("express");
var router = express.Router();
const popcornController = require('../../components/popcorn/PopcornController');

// http://localhost:3000/api/popcorn/getAllPopcorn
// lấy tất cả popcorn
router.get('/getAllPopcorn', async (req, res, next) => {
    try {
        const popcorns = await popcornController.getAllPopcorn();
        return res.status(200).json({result: true,  popcorns: popcorns});
    } catch (error) {
        return res.status(500).json({result: false, popcorns: null});
    }
})

module.exports = router;