const ticketService = require("./TicketService");
//Xem ve phim
const getTicketByAccount = async (email) => {
    try {
      return await ticketService.getTicketByAccount(email);
    } catch (error) {
      throw error;
    }
  };

  //Lấy tất cả danh sách vé
  const getAllTicket = async () => {
    try {
      return await ticketService.getAllTicket();
    } catch (error) {
      throw error;
    }
  };

  //Lấy danh sách vé theo ngày và tên phim
  const getTicketByDateAndNameMovie = async (date, nameMovie) => {
    try {
      return await ticketService.getTicketByDateAndNameMovie(date, nameMovie);
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
  const getTickets = async (req, res) => {
    try {
      return await ticketService.getTickets();
      
    } catch (error) {
      return false;
    }
  };
  module.exports = {
    getTicketByAccount,
    deleteTicketById,
    addNewTicket,
    getAllTicket,
    getTicketByDateAndNameMovie,
    getTickets,
    };