var connection = require("./connection");

// Heres is our connection to the mysql databse so we can log data for user
var ormObject = {
  insertUserInfo: function(newUser, callback) {
    var queryString =
      "INSERT INTO users (user_name, email, password, online), VALUES(?,?,?,?);";

    connection.query(
      queryString,
      [newUser.userName, newUser.userEmail, newUser.userPass, true],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  }
};

module.exports = ormObject;
