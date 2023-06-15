const accountService = require("./AccountService");

const register = async (email, password, name) => {
  try {
    return await accountService.register(email, password, name);
  } catch (error) {
    console.log(error);
  }
};

const login = async (email, password) => {
  return await accountService.login(email, password);
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
    return await accountService.updatePassword(
      id,
      name,
      email,
      password,
      role,
      address,
      phone,
      avatar
    );
  } catch (error) {
    console.log("Update password account failed", error);
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
    return await accountService.updateAccount(
      id,
      name,
      email,
      password,
      role,
      address,
      phone,
      avatar
    );
  } catch (error) {
    console.log("Update account failed", error);
  }
};
const getAccount = async () => {
  try {
    return await accountService.getAccount();
  } catch (error) {
    console.log("Get account by id failed", error);
  }
  return null;
};
module.exports = { register, login, updatePassword, updateAccount, getAccount };
