var user = require("../models/users");
var chatOrm = require("../config/orm");

var express = require("express");
var apiRoute = express.Router();

apiRoute = express();

apiRoute.use(express.urlencoded({ extended: true }));
apiRoute.use(express.json());

apiRoute.post("/users", function(req, res) {
  var newUser = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPass: req.body.userPassword
  };

  user.adduser(newUser, function() {
    res.redirect("/dashboard");
  });
});

module.exports = apiRoute;
