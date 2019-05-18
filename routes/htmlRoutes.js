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

htmlRoutes.post("/signOut", function(req, res) {
  user.changeStatus(userLoggedIn, function(data) {
    res.redirect("/signIn");
  });
});

htmlRoutes.post("/users", function(req, res) {
  var newUser = {
    userName: req.body.userName,
    userPass: req.body.userPassword
  };

  user.adduser(newUser, function(data) {
    console.log(data.insertId);
    userLoggedIn = data.insertId;
    res.redirect("/dashboard");
  });
});

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

htmlRoutes.post("/delete", function(req, res) {
  console.log(req.body);
});
htmlRoutes.post("/signIn", function(req, res) {
  var credentials = {
    name: req.body.userName,
    password: req.body.userPassword
  };

  user.getAllUsers(function(data) {
    for (var i = 0; i < data.length; i++) {
      if (
        credentials.name === data[i].user_name &&
        credentials.password === data[i].password &&
        data[i].online === 0
      ) {
        userLoggedIn = data[i].id;
        console.log(userLoggedIn);
        user.changeStatusSignOn(userLoggedIn, function(data) {
          res.redirect("/dashboard");
        });
        break;
      } else {
        console.log("user not found");
      }
    }
  });
});

htmlRoutes.get("/dashboard", function(req, res) {
  user.getTaskDataByUserId(userLoggedIn, function(data) {
    res.render("dashboard", { tasks: data });
  });
});

htmlRoutes.get("/map", function(req, res) {
  res.render("map");
});

htmlRoutes.get("/signUp", function(req, res) {
  res.render("signUp");
});

htmlRoutes.get("/signin", function(req, res) {
  res.render("signin");
});

htmlRoutes.get("/", function(req, res) {
  res.redirect("/signin");
});

module.exports = htmlRoutes;
