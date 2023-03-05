const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const md5 = require("md5");
const userModel = require("./models/UserSchema");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// MONGO DB Starts
mongoose.connect(process.env.MONGODB);

//MONGO DB Ends

app.post("/register", async function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = md5(req.body.password);
  const newUser = new userModel({
    username,
    email,
    password,
  });
  await newUser.save().catch((err) => {
    console.log(err);
  });
});

app.post("/login", async function (req, res) {
  const identity = req.body.identity;
  const password = md5(req.body.password);

  userModel
    .findOne({ email: identity })
    .then((foundUser) => {
      if (foundUser) {
        if (foundUser.password === password) {
          console.log("Found User!");
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, function () {
  console.log("Server Running on Port : 3000");
});
