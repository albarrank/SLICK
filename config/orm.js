var connection = require("./connection");

// Heres is our connection to the mysql databse so we can log data for user
var ormObject = {
  getAllUserData: function(callback) {
    var queryString = "SELECT * FROM users;";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  insertUserInfo: function(newUser, callback) {
    var queryString =
      "INSERT INTO users (user_name, email, password, online) VALUES (?,?,?,?);";

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
  },

  // eslint-disable-next-line no-empty-function
  userOnline: function() {},
  // eslint-disable-next-line no-empty-function
  userOffline: function() {},

  insertMessage: function(message) {
    console.log(message);
    console.log("data was saved");
  }
};

module.exports = ormObject;
