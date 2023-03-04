const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  identity: String,
  password: String,
});

const loginModel = mongoose.model("loginModel", loginSchema);
module.exports = loginModel;
