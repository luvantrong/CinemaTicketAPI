var express = require("express");
var router = express.Router();
const ticketController = require("../../components/tickets/TicketController");

// http://localhost:3000/api/ticket/getTicketByAccount
// Lấy  ticket theo tên tài khoản
router.post("/getTicketByAccount", async function (req, res, next) {
  try {
    const { email } = req.body;
    const listTicket = await ticketController.getTicketByAccount(email);
    return res.status(200).json({ result: true, Ticket: listTicket });
  } catch (err) {
    return res.status(500).json({ result: false, movies: null });
  }
});
// http://localhost:3000/api/ticket/addNewTicket
// Thêm ticket
router.post("/addNewTicket", async function (req, res, next) {
  try {
    const {
      tenPhim,
      giaVe,
      soGhe,
      ngayXem,
      suatXem,
      bapRang,
      soLuong,
      nguoiDung,
      image,
    } = req.body;
    const ticket = await ticketController.addNewTicket(
      tenPhim,
      giaVe,
      soGhe,
      ngayXem,
      suatXem,
      bapRang,
      soLuong,
      nguoiDung,
      image
    );
    if (ticket) {
      return res.status(200).json({ result: true, ticket: ticket });
    }
    return res.status(400).json({ result: false, ticket: null });
  } catch (err) {
    return res.status(500).json({ result: false, message: err.message });
  }
});

// http://localhost:3000/api/ticket/getTicketByNameAndNameMovie
// Lấy  ticket theo tên tài khoản
router.post("/getTicketByNameAndNameMovie", async function (req, res, next) {
  try {
    const { date, nameMovie } = req.body;
    const listTicket = await ticketController.getTicketByDateAndNameMovie(
      date,
      nameMovie
    );
    return res.status(200).json({ result: true, Ticket: listTicket });
  } catch (err) {
    return res.status(500).json({ result: false, movies: null });
  }
});

module.exports = router;
