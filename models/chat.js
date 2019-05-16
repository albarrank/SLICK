var chatOrm = require("../config/orm");

module.exports = function(io) {
  var messages = [];
  var isInitNotes = false;
  var socketCount = 0;
  //==========================================================
  var nsp = io.of("/example");

  nsp.on("connection", function(socket) {
    console.log("someone has joined the chat");
  });
  nsp.emit("hi", "everyone!");
  //==========================================================
  io.sockets.on("connection", function(socket) {
    // socket.on("create", function(room) {
    //   socket.join(room);
    // });

    console.log("\n initial connection has been made");
    socketCount++;
    io.sockets.emit("users connected", socketCount);

    socket.on("disconnect", function() {
      console.log("disconnect from socket.io");
      socketCount--;
      io.sockets.emit("users connected", socketCount);
    });

    socket.on("new message", function(data) {
      console.log("messages was sent");
      messages.push(data);

      io.sockets.emit("new message", data);

      chatOrm.insertMessage(data);
    });
  });
};
