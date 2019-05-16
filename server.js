require("dotenv").config();
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

var htmlRoute = require("./routes/htmlRoutes");
var apiRoute = require("./routes/apiRoutes");

app.use("/api", apiRoute);
app.use("/", htmlRoute);

var server = require("http").Server(app);
var io = require("socket.io")(server);

require("./models/chat")(io);

server.listen(PORT, function() {
  console.log("Server listening on: localhost: " + PORT);
});
