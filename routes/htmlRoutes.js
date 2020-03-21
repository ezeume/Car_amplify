var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("hometest");
  });

  //Load 404 page if error
  app.get("*", function (req, res) {
    res.render("404");
  });
};
