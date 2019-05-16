var chatOrm = require("../config/orm");

module.exports = function(io) {
  var messages = [];
  var isInitNotes = false;
  var socketCount = 0;
  var userName = "Anonymous";

  io.sockets.on("connection", function(socket) {
    console.log("\n New user connected");

    socketCount++;
    io.sockets.emit("users connected", socketCount);

    socket.on("disconnect", function() {
      console.log("disconnect from socket.io");
      socketCount--;
      io.sockets.emit("users connected", socketCount);
    });

    socket.on("signIn", function(userData) {
      chatOrm.getAllUserData(function(data) {
        for (var i = 0; i < data.length; i++) {
          if (
            userData.credentials.name === data[i].user_name &&
            userData.credentials.password === data[i].password &&
            data[i].online === 0
          ) {
            console.log("login succesful");
            userName = data[i].user_name;
            socket.emit("displayName", data[i].user_name);
            break;
          } else {
            console.log("user not found");
          }
        }
      });
    });
    socket.on("getUsers", function() {
      var users = [];
      chatOrm.getAllUserData(function(data) {
        for (var i = 0; i < data.length; i++) {
          users.push(data[i].user_name);
        }
        console.log(users);
        socket.emit("displayUsers", { user: users });
      });
    });
  });
};
