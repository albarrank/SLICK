var user = require("../models/users");
var chat = require("../models/chat");

var express = require("express");
var apiRoute = express.Router();

apiRoute = express();

apiRoute.use(express.urlencoded({ extended: true }));
apiRoute.use(express.json());

// This Route path will handle signing up users and logging into our database
apiRoute.post("/users", function(req, res) {
  //this is the all the info that is required from the sign up page
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
