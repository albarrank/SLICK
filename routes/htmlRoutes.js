var db = require("../models/chat");
var user = require("../models/users");
var express = require("express");
var htmlRoutes = express.Router();

htmlRoutes = express();

//used to send css files along with index handlbar
htmlRoutes.use(express.static("public"));
htmlRoutes.use(express.urlencoded({ extended: true }));
htmlRoutes.use(express.json());

var exphbs = require("express-handlebars");

htmlRoutes.engine("handlebars", exphbs({ defaultLayout: "main" }));
htmlRoutes.set("view engine", "handlebars");

var userLoggedIn = " ";

htmlRoutes.post("/tasks", function(req, res) {
  var tasks = {
    category: req.body.category,
    task: req.body.task,
    id: userLoggedIn
  };
  // console.log(userLoggedIn);
  user.saveTask(tasks, function(data) {
    res.redirect("/dashboard");
  });
});

htmlRoutes.post("/sign-in", function(req, res) {
  var credentials = {
    name: req.body.userName,
    password: req.body.userPassword
  };
  // console.log(userLoggedIn);

  // console.log(credentials);

  user.getAllUsers(function(data) {
    for (var i = 0; i < data.length; i++) {
      if (
        credentials.name === data[i].user_name &&
        credentials.password === data[i].password &&
        data[i].online === 0
      ) {
        // console.log("login succesful");

        userLoggedIn = data[i].id;

        // console.log(userLoggedIn);

        res.redirect("/dashboard");

        break;
      } else {
        console.log("user not found");
      }
    }
  });
});

htmlRoutes.get("/dashboard", function(req, res) {
  console.log("html get route here");
  user.getTaskDataByUserId(userLoggedIn, function(data) {
    console.log(data);
    res.render("dashboard", { tasks: data });
  });
});

htmlRoutes.get("/signup", function(req, res) {
  res.render("signUp");
});

htmlRoutes.get("/", function(req, res) {
  res.redirect("/signup");
});

module.exports = htmlRoutes;
