let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let cors = require("cors");
let methodOverride = require("method-override");
// modules for authentication
let session = require("express-session");
let passport = require("passport");
let config = require("config");

let flash = require("connect-flash");

// database setup
let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the db uri
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;

mongoDB.on("error", console.error.bind(console, "Connection Error:"));

mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

let usersRouter = require("../routes/user");
let binanceRouter = require("../routes/binance");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(methodOverride());
app.use(methodOverride("_method"));

// setup express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use("/api/binance", binanceRouter);
app.use("/api/user", usersRouter);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  console.log("!!catch all!!");
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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
  res.render("error", { title: err });
});

module.exports = app;
