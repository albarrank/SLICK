var db = require("../models/chat");
var express = require("express");
var htmlRoutes = express.Router();

htmlRoutes = express();

//used to send css files along with index handlbar
htmlRoutes.use(express.static("public"));

var exphbs = require("express-handlebars");

htmlRoutes.engine("handlebars", exphbs({ defaultLayout: "main" }));
htmlRoutes.set("view engine", "handlebars");

htmlRoutes.get("/", function(req, res) {
  res.redirect("/dashboard");
});
htmlRoutes.get("/signup", function(req, res) {
  res.render("signUp");
});

htmlRoutes.get("/dashboard", function(req, res) {
  res.render("dashboard");
});

module.exports = htmlRoutes;
