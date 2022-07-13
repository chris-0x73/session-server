var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

var app = express();

// MIDDLEWARES - A CHAIN OF FUNCTIONS THAT EVERY REQUST TO THIS API FLOWS THROUGH
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  session({
    secret: "gh13u1y3gd18o3g1o87g1o8d",
  })
);

// morgan middle writes nice logs for each request
app.use((req, res, next) => {
  console.log(
    req.method,
    req.path,
    req.sessionID,
    req.session.username,
    req.session.isLoggedIn
  );
  next();
}); // logger("dev")
// checks for json attached to the request
app.use(express.json());
// checks for html form data attached to the request
app.use(express.urlencoded({ extended: false }));
// checks for cookies attached to the request
app.use(cookieParser());

// grants access to the "public" folder if a request is just looking for a file from that folder
// eg. http://localhost:3000/stylesheets/style.css -> will just send back the CSS file, end of request.
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.get("/login", (req, res) =>
  res.render("login", { title: "login", sid: req.sessionID })
);
app.get("/app", (req, res) => {
  if (!req.session.isLoggedIn) {
    res.redirect("/login");
  } else {
    res.render("app", {
      title: "app",
      sid: req.sessionID,
      username: req.session.username,
    });
  }
});
app.use("/auth", authRouter);

app.use("/users", usersRouter);

// safety net starts here to catch unconcluded requests

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
