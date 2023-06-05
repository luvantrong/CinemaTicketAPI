const eventModel = require("./EventModel");

//Lấy danh sự kiện
const getAllEvents = async (page, size) => {
  try {
    return await eventModel.find();
  } catch (error) {
    console.log("Get all events error", error);
    throw error;
  }
};

//Xoá sự kiện theo id
const deleteEventById = async (id) => {
  try {
    await eventModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log("Delete event by id error", error);
    return false;
  }
};

//Thêm mới sự kiện
const addNewEvent = async (
  tenSuKien,
  anhBiaSuKien,
  noiDungSuKien
) => {
  try {
    const newEvent = {
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
    };
    const p = new eventModel(newEvent);
    await p.save();
    return true;
  } catch (error) {
    console.log("Add new event failed", error);
    return false;
  }
};

//Update sự kiện
const updateEvent = async (
  id,
  tenSuKien,
  anhBiaSuKien,
  noiDungSuKien
) => {
  try {
    const event = await eventModel.findById(id);
    if (event) {
        event.tenSuKien = tenSuKien ? tenSuKien : event.tenSuKien;
        event.anhBiaSuKien = anhBiaSuKien ? anhBiaSuKien : event.anhBiaSuKien;
        event.noiDungSuKien = noiDungSuKien ? noiDungSuKien : event.noiDungSuKien;     
      await event.save();
      return true;
    }
    return false;
  } catch (error) {
    console.log("Update item failed", error);
    return false;
  }
};

//Lấy thông tin sự kiện theo id
const getEventById = async (id) => {
  try {
    return await eventModel.findById(id);
  } catch (error) {
    console.log("Get eventById error", error);
    return null;
  }
};

module.exports = {
  getAllEvents,
  deleteEventById,
  updateEvent,
  addNewEvent,
  getEventById,
};
