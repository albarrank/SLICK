var db = require("../models");
var express = require("express");
var apiRoute = express.Router();

apiRoute = express();

apiRoute.use(express.urlencoded({ extended: true }));
apiRoute.use(express.json());

module.exports = apiRoute;

