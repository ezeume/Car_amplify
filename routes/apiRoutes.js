var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Car.findAll({}).then(function(car_db) {
      res.json(car_db);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Car.create(req.body).then(function(car_db) {
      res.json(car_db);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Car.destroy({ where: { id: req.params.id } }).then(function(car_db) {
      res.json(car_db);
    });
  });
};
