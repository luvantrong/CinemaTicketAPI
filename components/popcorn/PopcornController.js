const popcornService = require("./PopcornService");

const getAllPopcorn = async (page, size) => {
  try {
    return await popcornService.getAllPopcorn(page, size);
  } catch (error) {
    throw error;
  }
};

const deletePopcornById = async (id) => {
  try {
    return await popcornService.deletePopcornById(id);
  } catch (error) {
    return false;
  }
};

const addNewPopcorn = async (name, price, image, content) => {
  try {
    return await popcornService.addNewPopcorn(name, price, image, content);
  } catch (error) {
    console.log("Add new popcorn failed", error);
    return false;
  }
};

const updatePopcorn = async (id, name, price, image, content) => {
  try {
    return await popcornService.updatePopcorn(id, name, price, image, content);
  } catch (error) {
    console.log("Update popcorn failed", error);
  }
};

const getPopcornById = async (id) => {
  try {
    return await popcornService.getPopcornById(id);
  } catch (error) {
    console.log("Get popcorn by id failed", error);
  }
};
module.exports = {
  getAllPopcorn,
  deletePopcornById,
  addNewPopcorn,
  updatePopcorn,
  getPopcornById,
};
