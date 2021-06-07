const dbConfig = require("../../config/db");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url; 
db.users = require("./user.controller")(mongoose);

module.exports = db;