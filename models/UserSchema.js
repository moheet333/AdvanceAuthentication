const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET_STRING,
  encryptedFields: ["password"],
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
