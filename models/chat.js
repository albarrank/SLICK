var chatOrm = require("../config/orm");

module.exports = function(io) {
  var socketCount = 0;

  io.sockets.on("connection", function(socket) {
    console.log("\n New user connected");

    socketCount++;
    io.sockets.emit("users connected", socketCount);

    socket.on("disconnect", function() {
      console.log("disconnect from socket.io");
      socketCount--;
      io.sockets.emit("users connected", socketCount);
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
