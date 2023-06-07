const popcornModel = require("./PopcornModel");

//Lấy danh sách bắp rang
const getAllPopcorn = async (page, size) => {
  try {
    return await popcornModel.find();
  } catch (error) {
    console.log("Get all popcorn error", error);
    throw error;
  }
};

//Xoá bắp rang theo id
const deletePopcornById = async (id) => {
  try {
    await popcornModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("Delete popcorn by id error", error);
    return false;
  }
};

//Thêm mới bắp rang
const addNewPopcorn = async (name, price, image, content) => {
  try {
    const newPopcorn = {
      name,
      price,
      image,
      content
    };
    const p = new popcornModel(newPopcorn);
    await p.save();
    return true;
  } catch (error) {
    console.log("Add new popcorn failed", error);
    return false;
  }
};

//Update bắp rang
const updatePopcorn = async (id, name, price, image, content) => {
  try {
    const popcorn = await popcornModel.findById(id);
    if (popcorn) {
      popcorn.name = name ? name : popcorn.name;
      popcorn.price = price ? price : popcorn.price;
      popcorn.image = image ? image : popcorn.image;
      popcorn.content = content ? content : popcorn.content;
      await popcorn.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update item failed", error);
    return false;
  }
};

//Lấy thông tin phim theo id
const getPopcornById = async (id) => {
  try {
    return await popcornModel.findById(id);
  } catch (error) {
    console.log("Get popcornById error", error);
    return null;
  }
};

module.exports = {
  getAllPopcorn,
  deletePopcornById,
  addNewPopcorn,
  updatePopcorn,
  getPopcornById,
};
