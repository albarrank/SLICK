var orm = require("../config/orm");

// This object will strictly handle anything having to do with the user
var users = {
  adduser: function(newUser, callback) {
    orm.insertUserInfo(newUser, function(result) {
      callback(result);
    });
  },

  getAllUsers: function(callback) {
    orm.getAllUserData(function(result) {
      callback(result);
    });
  },

  saveTask: function(taskObject, callback) {
    orm.insertTaskData(taskObject, function(result) {
      callback(result);
    });
  },

  getTaskDataByUserId: function(userId, callback) {
    orm.getDataByUserId(userId, function(result) {
      callback(result);
    });
  }
};

module.exports = users;
