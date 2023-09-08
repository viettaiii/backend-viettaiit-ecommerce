const express = require("express");

const configViewEngine = (app) => {
  app.use("/static", express.static("public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");

  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/logout", (req, res) => {
    res.render("logout");
  });
};

module.exports = configViewEngine;
