var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");

//import các model, thứ tự rất quan trọng
require("./components/movies/MovieModel");
require("./components/events/EventModel");
require("./components/popcorn/PopcornModel");
require("./components/tickets/TicketModel");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//Cpanel
const movieCpanelRouter = require("./routes/cpanel/MovieCpanel");
const eventCpanelRouter = require("./routes/cpanel/EventCpanel");
const popcornCpanelRouter = require("./routes/cpanel/PopcornCpanel");
const ticketCpanelRouter = require("./routes/cpanel/TicketCpanel");

//API
const accountAPIRouter = require("./routes/api/AccountAPI");
const movieAPIRouter = require("./routes/api/MoviesAPI");
const eventAPIRouter = require("./routes/api/EventAPI");
const popcornAPIRouter = require("./routes/api/PopcornAPI");
const ticketAPIRouter = require("./routes/api/TicketAPI");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose
  .connect(
    "mongodb+srv://Cluster88996:tronglv96@cluster88996.uvdqfhn.mongodb.net/CinemaTicket?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!"))
  .catch((err) => console.log(">>>>>>>>>> DB error: ", err));

// mongoose
//   .connect(
//     "mongodb://127.0.0.1:27017/MOB402?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
//   .catch((err) => console.log(">>>>>>>>> DB Error: ", err));
app.use("/", indexRouter);
app.use("/users", usersRouter);

//Cpanel
// http://localhost:3000/cpanel/movie
app.use("/cpanel/movie", movieCpanelRouter);

// http://localhost:3000/cpanel/event
app.use("/cpanel/event", eventCpanelRouter);

// http://localhost:3000/cpanel/popcorn
app.use("/cpanel/popcorn", popcornCpanelRouter);

// http://localhost:3000/cpanel/ticket
app.use("/cpanel/ticket", ticketCpanelRouter);



//API
// http://localhost:3000/api/account
app.use("/api/account", accountAPIRouter);
// http://localhost:3000/api/movie
app.use("/api/movie", movieAPIRouter);
// http://localhost:3000/api/event
app.use("/api/event", eventAPIRouter);
// http://localhost:3000/api/popcorn
app.use("/api/popcorn", popcornAPIRouter);
// http://localhost:3000/api/ticket
app.use("/api/ticket", ticketAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
