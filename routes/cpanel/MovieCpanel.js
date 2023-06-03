var express = require("express");
var router = express.Router();
const movieController = require("../../components/movies/MovieController");
const uploadFile = require("../../middle/UploadFile");
const CONFIG = require("../../config/Config");
const auth = require("../../middle/Authen");

// http://localhost:3000/cpanel/movie
// Hiển thị danh sách phim
router.get("/", [auth.authetWeb], async (req, res, next) => {
  const movies = await movieController.getAllMovies(1, 10);
  console.log(movies);
  res.render("product/data-table", { movies });
});

// http://localhost:3000/cpanel/movie/new
// Hiển thị thêm mới phim
router.get("/new", [auth.authetWeb], async (req, res, next) => {
  try {
    var loaiPhim = [
      {
        lp: "2D"
      },
      {
        lp: "3D"
      }
    ]
    res.render("product/new", {loaiPhim});
  } catch (error) {
    next(error);
  }
});

// http://localhost:3000/cpanel/product/new
// Hiển thị thêm mới sản phẩm
router.post(
  "/new",
  [auth.authetWeb, uploadFile.single("image")],
  async (req, res, next) => {
    try {
      let { body, file } = req;
      if (file) {
        file = `${CONFIG.CONSTANTS.IP}images/${file.filename}`;
        body = { ...body, anhBia: file };
      }
      const { tenPhim,
        daoDien,
        quocGia,
        thoiLuong,
        loaiPhim,
        dangPhim,
        ngayKhoiChieu,
        anhBia,
        moTa } = body;

      const result = await movieController.addNewMovie(
        tenPhim,
        daoDien,
        quocGia,
        thoiLuong,
        loaiPhim,
        dangPhim,
        ngayKhoiChieu,
        anhBia,
        moTa
      );
      console.log(">>>new body a", body);
      console.log(">>>result", result);
      if (result) {
        return res.redirect("/cpanel/movie");
      } else {
        return res.redirect("/cpanel/movie/new");
      }
    } catch (error) {
      next(error);
    }
  }
);

// http://localhost:3000/cpanel/movie/:id/delete
// Xoá phim
router.post("/:id/delete", [auth.authetWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await movieController.deleteMovieById(id);
    res.json({ result });
  } catch (error) {
    res.json({ result: false });
  }
});

// http://localhost:3000/cpanel/movie/:id/edit
// Hiển thị cập nhật sản phẩm
router.get("/:id/edit", [auth.authetWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await movieController.getMovieById(id);
    var loaiPhim = [
      {
        lp: "2D"
      },
      {
        lp: "3D"
      }
    ]
    for (let index = 0; index < loaiPhim.length; index++) {
      let element = loaiPhim[index];
      console.log(element);
      loaiPhim[index].selected = false;
      if (element.lp.toString() == movie.loaiPhim.toString()) {
        loaiPhim[index].selected = true;
      }
    }
    res.render("product/edit", { movie, loaiPhim });
  } catch (error) {
    next(error);
  }
});

// http://localhost:3000/cpanel/product/:id/edit
// Xử lí cập nhật  sản phẩm
router.post(
  "/:id/edit",
  [auth.authetWeb, uploadFile.single("image")],
  async (req, res, next) => {
    try {
      let { id } = req.params;
      let { body, file } = req;
      if (file) {
        file = `${CONFIG.CONSTANTS.IP}images/${file.filename}`;
        body = { ...body, anhBia: file };
      }
      const {  
        tenPhim,
        daoDien,
        quocGia,
        thoiLuong,
        loaiPhim,
        dangPhim,
        ngayKhoiChieu,
        anhBia,
        moTa } = body;
      console.log(">>>update body", body);
      const result = await movieController.updateMovie(
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
      );

      console.log(">>>result", result);
      if (result) {
        return res.redirect("/cpanel/movie");
      } else {
        return res.redirect("/cpanel/movie/new");
      }
    } catch (error) {
      console.log("Update movie failed: ", error);
      next(error);
    }
  }
);


module.exports = router;
