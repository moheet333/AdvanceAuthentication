const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const userModel = require("./models/UserSchema");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// passport starts
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(userModel.createStrategy());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
// passport ends

// MONGO DB Starts
mongoose.connect(process.env.MONGODB);
//MONGO DB Ends

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    console.log("secrets");
  } else {
    console.log("redirect to login page");
  }
});

app.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/");
});

app.post("/register", async function (req, res) {
  userModel.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        console.log("Already registered");
      } else {
        passport.authenticate("local")(req, res, function () {
          console.log("Check if Authenticated");
          res.redirect("/secrets");
        });
      }
    }
  );
});

app.post("/login", async function (req, res) {
  // check documentation
  const user = new userModel({
    identity: req.body.identity,
    password: req.body.password,
  });
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        console.log("Authenticated");
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server Running on Port : 3000");
});
