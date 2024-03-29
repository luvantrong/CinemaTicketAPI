var express = require("express");
var router = express.Router();
const port = 3000;
const auth = require("../../middle/Authen");
const ticketController = require("../../components/tickets/TicketController");
const moviewController = require("../../components/movies/MovieController");
const Chart = require("chart.js");

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
//http://localhost:3000/cpanel/ticket/thongke
// Thống kê vé
router.get("/thongke", async (req, res, next) => {
  try {
    const movieName = await moviewController.getAllMovies_v2();
    const tickets = await ticketController.getTickets();
    let tongDoanhThu = 0;
    for (let index = 0; index < tickets.length; index++) {
      tongDoanhThu += tickets[index].giaVe;

    }

    const danhSachPhim = [];
    for (let i = 0; i < movieName.length; i++) {
      danhSachPhim.push(movieName[i].tenPhim);
    }

    let tien = [];
    let tongDoanhThuTheoPhim = [];
    for (let i = 0; i < danhSachPhim.length; i++) {
      let t = 0;
      for (let j = 0; j < tickets.length; j++) {

        if (danhSachPhim[i] == tickets[j].tenPhim) {
          t += tickets[j].giaVe;
        }
      }
      tongDoanhThuTheoPhim[i] = danhSachPhim[i] + ": " + t;
      tien.push(t);

    }
    // const tongDoanhThuTheoPhim = tinhTongDoanhThuTheoPhim(tickets, danhSachPhim)

    // return res.status(200).json({ result: true, tongDoanhThu: tongDoanhThu, tien: tien,tongDoanhThuTheoPhim:tongDoanhThuTheoPhim});
    res.render("account/bar-charts",{danhSachPhim,tien});
    


    // const data = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [{
    //     label: 'Dataset 1',
    //     backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //     borderColor: 'rgba(255, 99, 132, 1)',
    //     borderWidth: 1,
    //     data: [10, 20, 30, 40, 50, 60, 70]
    //   }, {
    //     label: 'Dataset 2',
    //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //     borderColor: 'rgba(54, 162, 235, 1)',
    //     borderWidth: 1,
    //     data: [20, 30, 40, 50, 60, 70, 80]
    //   }]
    // };
    // res.json(data);

  } catch (error) {
    res.json({ result: false });
  }
});

// function tinhTongDoanhThuTheoPhim(tickets, danhSachPhim) {
//   const tongDoanhThuTheoPhim = {};
//   danhSachPhim.forEach(tenPhim => {
//     tongDoanhThuTheoPhim[tenPhim] = 0;
//   });
//   tickets.forEach(v => {
//     tongDoanhThuTheoPhim[v.tenPhim] += tickets.giaVe;
//   });
//   return tongDoanhThuTheoPhim;
// }
module.exports = router;