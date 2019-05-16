$(document).ready(function() {
  // JS for Dashboard page ================================================
  var socket = io.connect("http://localhost:3000");

  socket.on("users connected", function(data) {
    $("#usersConnected").html("Users connected: " + data);
  });

  //JS for sign in stuff ==================================================
  $(".btn").on("click", function() {
    var userName = $("#userName")
      .val()
      .trim();
    var password = $("#password")
      .val()
      .trim();

    var credentials = {
      name: userName,
      password: password
    };
    socket.emit("signIn", { credentials: credentials });
  });

  socket.on("displayName", function(data) {
    var html = "<h1>" + data + "</h1>";
    $("#nameDisplay").html(html);
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
