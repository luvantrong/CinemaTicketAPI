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
    const tickets = await ticketController.getAllTicket();
    let tongDoanhThu = 0;
    for (let index = 0; index < tickets.length; index++) {
      tongDoanhThu += tickets[index].giaVe;

    }

    const danhSachPhim = [];
    for (let i = 0; i < movieName.length; i++) {
      danhSachPhim.push(movieName[i].tenPhim);
    }

    // let tien = [];
    // let tongDoanhThuTheoPhim = [];
    // for (let i = 0; i < danhSachPhim.length; i++) {
    //   let t = 0;
    //   for (let j = 0; j < tickets.length; j++) {

    //     if (danhSachPhim[i] == tickets[j].tenPhim) {
    //       t += tickets[j].giaVe;
    //     }
    //   }
    //   tongDoanhThuTheoPhim[i] = danhSachPhim[i] + ": " + t;
    //   tien.push(t);

    // }
    const tongDoanhThuTheoPhim = tinhTongDoanhThuTheoPhim(tickets, danhSachPhim)

    const entriesArray = Object.entries(tongDoanhThuTheoPhim);
    let dsTK = [];

    for (let index = 0; index < entriesArray.length; index++) {
      const element = entriesArray[index];
      const myObject = {
        tenPhim: element[0],
        tongDoanhThu: element[1],
      };
      dsTK.push(myObject);
    }


    

    // return res.status(200).json({ result: true, tongDoanhThu: tongDoanhThu, tien: tien,tongDoanhThuTheoPhim:tongDoanhThuTheoPhim});
    res.render("ticket/data-table2",{ds: dsTK, tongDoanhThu: tongDoanhThu});
    // res.json({results: true, status: 200, ds: dsTK});

  } catch (error) {
    res.json({ result: false });
  }
});

function tinhTongDoanhThuTheoPhim(tickets, danhSachPhim) {
  const tongDoanhThuTheoPhim = {};
  danhSachPhim.forEach(tenPhim => {
    tongDoanhThuTheoPhim[tenPhim] = 0;
  });
  tickets.forEach(v => {
    tongDoanhThuTheoPhim[v.tenPhim] += v.giaVe;
  });
  return tongDoanhThuTheoPhim;
}
module.exports = router;