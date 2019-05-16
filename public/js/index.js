$(document).ready(function() {
  // JS for Dashboard page ================================================
  var socket = io.connect("http://localhost:3000");

  socket.on("users connected", function(data) {
    $("#usersConnected").html("Users connected: " + data);
  });

  // stuff for creating chats=====================================================
  socket.emit("getUsers");

  socket.on("displayUsers", function(users) {
    for (var i = 0; i < users.user.length; i++) {
      console.log(users);
      var html = "<li>" + users.user[i] + "</li>";
      $("#users").append(html);
    }
  });
});
