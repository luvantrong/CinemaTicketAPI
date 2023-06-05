var express = require("express");
var router = express.Router();
const eventController = require("../../components/events/EventController");
const uploadFile = require("../../middle/UploadFile");
const CONFIG = require("../../config/Config");
const auth = require("../../middle/Authen");

// http://localhost:3000/cpanel/movie
// Hiển thị danh sách sự kiện
router.get("/", [auth.authetWeb], async (req, res, next) => {
    const events = await eventController.getAllEvent(1, 10);
    console.log(events);
    res.render("event/data-table", { events });
  });

// http://localhost:3000/cpanel/movie/new
// Hiển thị thêm mới phim
router.get("/new", [auth.authetWeb], async (req, res, next) => {
  try {
    res.render("event/new");
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
        body = { ...body, anhBiaSuKien: file };
      }
      const { tenPhim,
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
       } = body;

      const result = await eventController.addNewEvent(
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
      );
      console.log(">>>new body a", body);
      console.log(">>>result", result);
      if (result) {
        return res.redirect("/cpanel/event");
      } else {
        return res.redirect("/cpanel/event/new");
      }
    } catch (error) {
      next(error);
    }
  }
);

// http://localhost:3000/cpanel/event/:id/delete
// Xoá sự kiện
router.post("/:id/delete", [auth.authetWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventController.deleteEventById(id);
    res.json({ result });
  } catch (error) {
    res.json({ result: false });
  }
});

// http://localhost:3000/cpanel/movie/:id/edit
// Hiển thị cập nhật sự kiện
router.get("/:id/edit", [auth.authetWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await eventController.getEventById(id);
    res.render("event/edit", { event });
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
        body = { ...body, anhBiaSuKien: file };
      }
      const {  
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
      } = body;
      console.log(">>>update body", body);
      const result = await eventController.updateEvent(
        id,
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
      );

      console.log(">>>result", result);
      if (result) {
        return res.redirect("/cpanel/event");
      } else {
        return res.redirect("/cpanel/event/new");
      }
    } catch (error) {
      console.log("Update event failed: ", error);
      next(error);
    }
  }
);


module.exports = router;