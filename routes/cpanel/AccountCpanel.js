var express = require("express");
var router = express.Router();
const CONFIG = require("../../config/Config");
const auth = require("../../middle/Authen");
const accountController = require("../../components/accounts/AccountController");

// http://localhost:3000/cpanel/account
// Hiển thị danh sách phim
router.get("/", async (req, res, next) => {
    try {
        const accounts = await accountController.getAccount(1, 10);
        // console.log(accounts);
        res.render("account/data-table", { accounts });
      
    } catch (error) {
        next(error);
    }
   
    

  });
module.exports = router;