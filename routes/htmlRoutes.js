var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("home"
    );
  });

  // app.get("/signup", function(req, res) {
  //   db.Car.findOne({ where: { id: req.params.id } }).then(function(car_db) {
  //     res.render("signup", {
  //       cars: car_db
  //     });
  //   });
  // });

  app.get("/signup", function (req, res) {

    res.render("signup");
  });
  

  // Load example page and pass in an example by id
  app.get("/signin", function (req, res) {

    res.render("signin")
  });

  app.get("/mygarage", function (req, res) {

    res.render("mygarage")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
