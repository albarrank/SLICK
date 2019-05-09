var mysql = require("mysql");
require("dotenv").config();

if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "example_db"
  });
}

connection.connect(function(err) {
  if (err) {
    console.log("this did not go well");
    return;
  }
  console.log("MySQL connected: " + connection.threadId);
});

module.exports = connection;
