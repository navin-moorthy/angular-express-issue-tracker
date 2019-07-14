/* app Module */

/**
 * Express Module Dependencies
 */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const issuesRouter = require("./routes/issues");

const app = express();

/**
 * view engine setup
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

/**
 * use module dependencies
 */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PATCH, DELETE, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// app.use("/", indexRouter);
app.use("/issues", issuesRouter);
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
