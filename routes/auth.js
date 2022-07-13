var express = require("express");
var router = express.Router();

//localhost:3000/auth/login
router.post("/login", function (req, res, next) {
  req.session.username = req.body.username;
  req.session.isLoggedIn = true;
  res.redirect("/app");
});

// being "logged in" just means that your
// sessionID is connected to a user in the database

router.get("/logout", function (req, res, next) {
  res.send("this is the auth router");
});

router.post("/register", function (req, res, next) {
  res.send("this is the auth router");
});

router.get("/reset-password", function (req, res, next) {
  res.send("this is the auth router");
});

router.get("/delete-account", function (req, res, next) {
  res.send("this is the auth router");
});

module.exports = router;
