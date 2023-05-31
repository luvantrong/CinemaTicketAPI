//Bắt lỗi
//Bắt lỗi đăng kí

const checkRegister = async (req, res, next) => {
  try {
    const { email, password, name, confirm_password } = req.body;
    if (!email || !password || !name || !confirm_password) {
      return res
        .status(400)
        .json({ result: false, message: "Vui lòng nhập đầy đủ thông tin" });
    } else {
      if (password.toString() != confirm_password.toString()) {
        return res
          .status(400)
          .json({ result: false, message: "Mật khẩu không khớp" });
      }
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          result: false,
          message: "Email không hợp lệ",
        });
      }
      next();
    }
  } catch (error) {
    console.log("Check register error: ", error);
    return res.status(400).json({ result: false, message: "Lỗi hệ thống" });
  }
};

const checkLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ result: false, message: "Vui lòng nhập đầy đủ thông tin" });
    } else {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          result: false,
          message: "Email không hợp lệ",
        });
      }
      next();
    }
  } catch (error) {
    console.log("Check login error: ", error);
    return res.status(400).json({ result: false, message: "Lỗi hệ thống" });
  }
};

module.exports = { checkRegister, checkLogin };
