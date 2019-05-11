var db = require("../models");

var htmlRoutes = require("express").Router();

htmlRoutes.get("/", function(req, res) {
  res.send("hello world");
});

module.exports = htmlRoutes;
