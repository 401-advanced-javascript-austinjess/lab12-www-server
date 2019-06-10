"use strict";

const express = require("express");
const authRouter = express.Router();

const User = require("./users-model");
const auth = require("./middleware");
// const oauth = require("./oauth/google.js");
// const githubAuth = require("./oauth/github");

authRouter.post("/signup", (req, res, next) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      req.user = user;
      req.token = user.generateToken();

      res.set("token", req.token);
      res.cookie("auth", req.token);
      res.send(req.token);
    })
    .catch(next);
});


authRouter.post("/signin", auth, (req, res, next) => {
  res.cookie("auth", req.token);
  res.send(req.token);
});

authRouter.get("/oauth", (req, res, next) => {
  oauth(req).then(token => {
    res.status(200).send(token);
  });
});

authRouter.get("./githubAuth", (req, res, next) => {
  githubAuth(req)
    .then(token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;
