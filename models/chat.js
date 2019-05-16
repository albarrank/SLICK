var chatOrm = require("../config/orm");

module.exports = function(io) {
  var messages = [];
  var isInitNotes = false;
  var socketCount = 0;

  io.on("connection", function(socket) {
    console.log("\n initial connection has been made");
    socketCount++;
    io.sockets.emit("users connected", socketCount);
  });
};
