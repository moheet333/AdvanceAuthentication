const mongoose = require("mongoose");
require("dotenv").config();
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
