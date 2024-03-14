const express = require("express");
const router = require("./routes");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const app = express();

app.use(express.json());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api", router);

module.exports = app;