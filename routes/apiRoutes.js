var db = require("../models");
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Make.findAll({}).then(function (makeData) {
      res.json(makeData);
    })
  });
  //Get specific models
  app.get("/api/examples/:id", function (req, res) {
    db.Model.findAll({ where: { makeId: req.params.id } }).then(function (modelData) {
      res.json(modelData);
    })
  });
  //Post previous search item
  app.post("/api/examples", function (req, res) {
    db.PastSearch.create({
      year: req.body.year,
      make: req.body.make,
      model: req.body.model
    }).then(function (dbPastSearch) {
      res.json(dbPastSearch)
    })
  });
  //Get search items
  app.get("/api/searches", function (req, res) {
    db.PastSearch.findAll({}).then(function (pastSearch) {
      res.json(pastSearch);
    })
  });
  app.delete("/api/delete", function (req, res) {
    db.PastSearch.destroy({
      where: {},
      truncate: true
    }).then(function () {
      res.end()
    });
  });
}