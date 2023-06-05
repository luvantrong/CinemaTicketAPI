var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middle/Authen");

const accountController = require("../components/accounts/AccountController");

/* GET home page. */
// http://localhost:3000/
router.get("/", [auth.authetWeb], function (req, res, next) {
  //Hiển thị trang chủ
  res.render("user/index");
});

// http://localhost:3000/login
router.get("/login", [auth.authetWeb], function (req, res, next) {
  //Hiển thị trang chủ
  res.render("user/login");
});

// http://localhost:3000/login
router.post("/login", [auth.authetWeb], async (req, res, next) => {
  //Xử lý login
  //nếu login thành công thì chuyển qua trang chủ
  //nếu login thất bại thì chuyển qua trang login
  const { email, password } = req.body;
  const result = await accountController.login(email, password);
  console.log(result);
  if (result) {
    //Lưu thông tin vào token
    const token = jwt.sign({ _id: result._id, role: result.role }, "secret", {
      expiresIn: 1 * 60 * 60,
    });
    req.session.token = token;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
});



module.exports = router;
