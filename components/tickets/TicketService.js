const ticketModel = require("./TicketModel");
//Xem vé phim theo tài khoản
const getTicketByAccount = async (email) => {
    try {
        // const regex = new RegExp(email, "i");
        return await ticketModel.find({
        nguoiDung: {$regex: email, $options: "i" }
        });
    } catch (error) {
        console.log("Get ticket by account error", error);
        throw error;
    }
};

//Xem vé phim theo ngày xem và tên phim
const getTicketByDateAndNameMovie = async (date, nameMovie) => {
    try {
        const regexDate = new RegExp(date, "i");
        const regexNameMovie = new RegExp(nameMovie, "i");
        return await ticketModel.find(
        { $or: [{ "ngayXem": { $regex: regexDate, } }, { "tenPhim": {$regex : regexNameMovie}  }] }
        );
    } catch (error) {
        console.log("Get ticket by account error", error);
        throw error;
    }
};
//Xoá ticket theo id
const deleteTicketById = async (id) => {
    try {
        await ticketModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log("Delete ticket by id error", error);
        return false;
    }
};
//Thêm mới ticket
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
        const newTicket = {
            tenPhim,
            giaVe,
            soGhe,
            ngayXem,
            suatXem,
            bapRang,
            soLuong,
            nguoiDung,
        };
        const p = new ticketModel(newTicket);
        await p.save();
        return true;
    } catch (error) {
        console.log("Add new Ticket failed", error);
        return false;
    }
};
const getAllTicket = async () => {
    try {
        // const regex = new RegExp(email, "i");
        return await ticketModel.find();
    } catch (error) {
        console.log("Get ticket by account error", error);
        throw error;
    }
};
module.exports = {
    getTicketByAccount,
    deleteTicketById,
    addNewTicket,
    getAllTicket,
    getTicketByDateAndNameMovie
};
