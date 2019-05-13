var orm = require("../config/orm");

// This object will strictly handle anything having to do with the user
var users = {
  adduser: function(newUser, callback) {
    orm.insertUserInfo(newUser, function(result) {
      callback(result);
    });
  }
};

module.exports = users;
