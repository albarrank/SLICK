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
      "INSERT INTO users (user_name, password, online) VALUES (?,?,?);";

    connection.query(
      queryString,
      [newUser.userName, newUser.userPass, true],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  setToOffline: function(userId, callback) {
    var queryString = "UPDATE users SET online = ? WHERE id = ?;";
    connection.query(queryString, [0, userId], function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  setToOnline: function(userId, callback) {
    console.log("testing 2");
    var queryString = "UPDATE users SET online = ? WHERE id = ?;";
    connection.query(queryString, [1, userId], function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  insertTaskData: function(taskObject, callback) {
    var queryString =
      "INSERT INTO tasks (id, category, task) VALUES (?, ?, ?);";

    connection.query(
      queryString,
      [taskObject.id, taskObject.category, taskObject.task],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
    console.log("data was saved");
  },

  getDataByUserId: function(userId, callback) {
    var queryString = "SELECT * FROM tasks WHERE id = ?;";
    connection.query(queryString, [userId], function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
};

module.exports = ormObject;
