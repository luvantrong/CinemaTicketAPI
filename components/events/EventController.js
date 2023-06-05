const eventService = require("../events/EventService");

const getAllEvent = async (page, size) => {
  try {
    return await eventService.getAllEvents(page, size);
  } catch (error) {
    throw error;
  }
};

const deleteEventById = async (id) => {
  try {
    return await eventService.deleteEventById(id);
  } catch (error) {
    return false;
  }
};

const addNewEvent = async (
    tenSuKien,
    anhBiaSuKien,
    noiDungSuKien
) => {
  try {
    return await eventService.addNewEvent(
        tenSuKien,
        anhBiaSuKien,
        noiDungSuKien
    );
  } catch (error) {
    console.log("Add new event failed", error);
    return false;
  }
};

const updateEvent = async (
  id,
  tenSuKien,
  anhBiaSuKien,
  noiDungSuKien
) => {
  try {
    return await eventService.updateEvent(
      id,
      tenSuKien,
      anhBiaSuKien,
      noiDungSuKien
    );
  } catch (error) {
    console.log("Update event failed", error);
  }
};

const getEventById = async (id) => {
  try {
    return await eventService.getEventById(id);
  } catch (error) {
    console.log("Get event by id failed", error);
  }
};


module.exports = {
 getAllEvent,
 deleteEventById,
 addNewEvent,
 updateEvent,
 getEventById
};
