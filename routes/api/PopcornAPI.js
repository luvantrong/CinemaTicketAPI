var express = require("express");
var router = express.Router();
const popcornController = require("../../components/popcorn/PopcornController");

// http://localhost:3000/api/popcorn/getAllPopcorn
// lấy tất cả popcorn
router.get("/getAllPopcorn", async (req, res, next) => {
  try {
    const popcorns = await popcornController.getAllPopcorn();
    return res.status(200).json({ result: true, popcorns: popcorns });
  } catch (error) {
    return res.status(500).json({ result: false, popcorns: null });
  }
});

// Lấy danh sách bắp theo id
// http://localhost:3000/api/popcorn/get-by-id
router.post("/get-by-id", async (req, res, next) => {
  try {
    const { id } = req.body;
    const popcorn = await popcornController.getPopcornById(id);
    if (popcorn) {
      return res.status(200).json({ result: true, popcorn: popcorn });
    } else {
      return res.status(201).json({ result: false, popcorn: null });
    }
  } catch (error) {
    console.log("Get by id error: ", error);
    return res.status(400).json({ result: false, popcorn: null });
  }
});

module.exports = router;
