var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Car.findAll({}).then(function(car_db) {
      res.render("index", {
        msg: "Welcome!",
        cars: car_db
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Car.findOne({ where: { id: req.params.id } }).then(function(car_db) {
      res.render("example", {
        cars: car_db
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
