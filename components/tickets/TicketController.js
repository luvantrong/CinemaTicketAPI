const ticketService = require("./TicketService");
//Xem ve phim
const getTicketByAccount = async (email) => {
    try {
      return await ticketService.getTicketByAccount(email);
    } catch (error) {
      throw error;
    }
  };
  const getAllTicket = async () => {
    try {
      return await ticketService.getAllTicket();
    } catch (error) {
      throw error;
    }
  };
  //Xoá ticket theo id
  const deleteTicketById = async (id) => {
    try {
      return await ticketService.deleteTicketById(id);
    } catch (error) {
      return false;
    }
  };
  //them ticket
  const addNewTicket = async (
    tenPhim,
    giaVe,
    soGhe,
    ngayXem,
    suatXem,
    bapRang,
    soLuong,
    nguoiDung
  ) => {
    try {
      return await ticketService.addNewTicket(
        tenPhim,
        giaVe,
        soGhe,
        ngayXem,
        suatXem,
        bapRang,
        soLuong,
        nguoiDung
      );
    } catch (error) {
      console.log("Add new ticket failed", error);
      return false;
    }
  };
  module.exports = {
    getTicketByAccount,
    deleteTicketById,
    addNewTicket,
    getAllTicket,
    };