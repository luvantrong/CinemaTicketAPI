const accountModel = require("./AccountModel");
const bcrypt = require("bcryptjs");

const register = async (email, password, name) => {
  try {
    const account = await accountModel.findOne({ email: email });
    console.log("Check email", account);
    if (account) return false;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const newAccount = {
      email,
      password: hash,
      name,
      role: 1,
      address: "",
      phone: "",
      avatar: "",
    };
    const acc = new accountModel(newAccount);
    await acc.save();
    return true;
  } catch (error) {
    console.log("Register error: ", error);
    return false;
  }
};

const login = async (email, password) => {
  try {
    const account = await accountModel.findOne({ email: email });
    if (account) {
      const result = bcrypt.compareSync(password, account.password);
      return result ? account : false;
    }
    return false;
  } catch (error) {
    console.log("Login error ", error);
  }
};

const updatePassword = async (
  id,
  name,
  email,
  password,
  role,
  address,
  phone,
  avatar
) => {
  try {
    const account = await accountModel.findById(id);
    if (account) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);
      account.name = name ? name : account.name;
      account.email = email ? email : account.email;
      account.password = password ? hash : account.password;
      account.role = role ? role : account.role;
      account.address = address ? address : account.address;
      account.phone = phone ? phone : account.phone;
      account.avatar = avatar ? avatar : account.avatar;
      await account.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update password account failed", error);
    return false;
  }
};

const updateAccount = async (
  id,
  name,
  email,
  password,
  role,
  address,
  phone,
  avatar
) => {
  try {
    const account = await accountModel.findById(id);
    if (account) {
      var salt = bcrypt.genSaltSync(10);
      account.name = name ? name : account.name;
      account.email = email ? email : account.email;
      account.password = password
        ? bcrypt.hashSync(password, salt)
        : account.password;
      account.role = role ? role : account.role;
      account.address = address ? address : account.address;
      account.phone = phone ? phone : account.phone;
      account.avatar = avatar ? avatar : account.avatar;
      await account.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update account failed", error);
    return false;
  }
};

module.exports = { register, login, updatePassword, updateAccount };
