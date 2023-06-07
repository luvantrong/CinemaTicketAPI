var express = require("express");
var router = express.Router();
const popcornController = require("../../components/popcorn/PopcornController")
const uploadFile = require("../../middle/UploadFile");
const CONFIG = require("../../config/Config");
const auth = require("../../middle/Authen");

// http://localhost:3000/cpanel/popcorn
// Hiển thị danh sách bắp rang
router.get("/", [auth.authetWeb], async (req, res, next) => {
  const popcorns = await popcornController.getAllPopcorn(1, 10);
  console.log(popcorns);
  res.render("popcorn/data-table", { popcorns });
});

// http://localhost:3000/cpanel/popcorn/new
// Hiển thị thêm bắp rang
router.get("/new", [auth.authetWeb], async (req, res, next) => {
    try {
      res.render("popcorn/new");
    } catch (error) {
      next(error);
    }
  });

  // http://localhost:3000/cpanel/popcorn/new
// Hiển thị thêm mới bắp rang
router.post(
    "/new",
    [auth.authetWeb, uploadFile.single("image")],
    async (req, res, next) => {
      try {
        let { body, file } = req;
        if (file) {
          file = `${CONFIG.CONSTANTS.IP}images/${file.filename}`;
          body = { ...body, image: file };
        }
        const { name, price, image ,content} = body;
  
        const result = await popcornController.addNewPopcorn(
            name, price, image, content
        );
        console.log(">>>new body a", body);
        console.log(">>>result", result);
        if (result) {
          return res.redirect("/cpanel/popcorn");
        } else {
          return res.redirect("/cpanel/popcorn/new");
        }
      } catch (error) {
        next(error);
      }
    }
  );

  // http://localhost:3000/cpanel/popcorn/:id/delete
// Xoá bắp rang
router.post("/:id/delete", [auth.authetWeb], async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await popcornController.deletePopcornById(id);
      res.json({ result });
    } catch (error) {
      res.json({ result: false });
    }
  });

  // http://localhost:3000/cpanel/popcorn/:id/edit
// Hiển thị cập nhật sản phẩm
router.get("/:id/edit", [auth.authetWeb], async (req, res, next) => {
    try {
      const { id } = req.params;
      const popcorn = await popcornController.getPopcornById(id);
      res.render("popcorn/edit", { popcorn});
    } catch (error) {
      next(error);
    }
  });

// http://localhost:3000/cpanel/popcorn/:id/edit
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
          body = { ...body, image: file };
        }
        const {  
          name,
          price,
          image } = body;
        console.log(">>>update body", body);
        const result = await popcornController.updatePopcorn(
            id,
          name,
          price,
          image
        );
  
        console.log(">>>result", result);
        if (result) {
          return res.redirect("/cpanel/popcorn");
        } else {
          return res.redirect("/cpanel/popcorn/new");
        }
      } catch (error) {
        console.log("Update popcorn failed: ", error);
        next(error);
      }
    }
  );
module.exports = router;