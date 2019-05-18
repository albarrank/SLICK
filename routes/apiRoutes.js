var express = require("express");
var apiRoute = express.Router();

apiRoute = express();

apiRoute.use(express.urlencoded({ extended: true }));
apiRoute.use(express.json());

apiRoute.post("/key", function(req, res) {
  res.send("pickle");
});

module.exports = apiRoute;
