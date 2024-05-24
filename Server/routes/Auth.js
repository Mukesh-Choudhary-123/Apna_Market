const express = require("express");
const passport = require("passport");
const { createUser, loginUser, checkUser } = require("../controller/Auth");

const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

exports.router = router;
