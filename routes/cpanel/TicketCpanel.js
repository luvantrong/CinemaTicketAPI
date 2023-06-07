var express = require("express");
var router = express.Router();
const auth = require("../../middle/Authen");
const ticketController = require("../../components/tickets/TicketController");

// http://localhost:3000/cpanel/ticket
// Hiển thị ticket
router.get("/", [auth.authetWeb], async (req, res, next) => {
  const tickets = await ticketController.getAllTicket();
  
  res.render("ticket/data-table", { tickets });
});
 // http://localhost:3000/cpanel/ticket/:id/delete
// Xoá ticket
router.post("/:id/delete", [auth.authetWeb], async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ticketController.deleteTicketById(id);
    res.json({ result });
  } catch (error) {
    res.json({ result: false });
  }
});

module.exports = router;