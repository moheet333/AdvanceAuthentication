const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
