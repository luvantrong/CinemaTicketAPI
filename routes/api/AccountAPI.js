var express = require("express");
var router = express.Router();

const accountModel = require("../../components/accounts/AccountModel");
const accountController = require("../../components/accounts/AccountController");
const uploadFile = require("../../middle/UploadFile");
const CONFIG = require("../../config/Config");

const validation = require("../../middle/Validation");
const jwt = require("jsonwebtoken");

// API register account
// http://localhost:3000/api/account/register
router.post("/register", [validation.checkRegister], async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const account = await accountController.register(email, password, name);
    if (account) {
      return res.status(200).json({ result: true, account: account });
    }
    return res
      .status(400)
      .json({ result: false, account: null, message: "Tài khoản đã tồn tại" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, account: null });
  }
});

// API login account
// http://localhost:3000/api/account/login
router.post("/login", [validation.checkLogin], async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const account = await accountController.login(email, password);
    if (account) {
      const token = jwt.sign({ account }, "secret", { expiresIn: "1h" });
      return res
        .status(200)
        .json({ result: true, account: account, token: token });
    } else {
      return res.status(400).json({
        result: false,
        account: null,
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, message: "Loi he thong" });
  }
});

// API update password account
// http://localhost:3000/api/account/update-password
router.post("/update-password", async (req, res, next) => {
  try {
    const { id, name, email, password, role, address, phone, avatar } =
      req.body;
    console.log(password);
    const account = await accountController.updatePassword(
      id,
      name,
      email,
      password,
      role,
      address,
      phone,
      avatar
    );
    if (account) {
      const accountNew = {
        _id: id,
        name: name,
        email: email,
        password: password,
        role: role,
        address: address,
        phone: phone,
        avatar: avatar,
      };
      return res.status(200).json({
        result: true,
        account: accountNew,
        message: "Đổi mật khẩu thành công",
      });
    }
    return res
      .status(400)
      .json({ result: false, account: null, message: "Đổi mật khẩu thất bại" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, account: null });
  }
});

// API update account
// http://localhost:3000/api/account/update-account
router.post("/update-account", async (req, res, next) => {
  try {
    const { id, name, email, password, role, address, phone, avatar } =
      req.body;
    const account = await accountController.updateAccount(
      id,
      name,
      email,
      password,
      role,
      address,
      phone,
      avatar
    );
    if (account) {
      const accountNew = await accountModel.findById(id);
      const accountNew2 = {
        _id: id,
        name: accountNew.name,
        email: accountNew.email,
        password: accountNew.password,
        role: accountNew.role,
        address: address,
        phone: phone,
        avatar: avatar,
      };
      return res.status(200).json({ result: true, account: accountNew2 });
    }
    return res
      .status(400)
      .json({ result: false, account: null, message: "Tài khoản đã tồn tại" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ result: false, account: null });
  }
});

// http://localhost:3000/api/account/upload-image-test
router.post(
  "/:upload-image-test",
  [uploadFile.single("image")],
  async (req, res, next) => {
    try {
      const { file } = req;
      if (file) {
        const link = `${CONFIG.CONSTANTS.IP}images/${file.filename}`;
        return res.status(200).json({ result: true, link: link });
      }
      return res.status(400).json({ result: false, link: null });
    } catch (error) {
      console.log("Upload image product failed: ", error);
      return res.status(500).json({ result: error });
    }
  }
);
// http://localhost:3000/api/account/seach-by-name
router.post("/seach-by-name",  async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const products = await accountController.searchProductName(email);
    return res.status(200).json({ result: true, products: products });
  } catch (error) {
    return res.status(400).json({ result: false, products: null });
  }
});
module.exports = router;
