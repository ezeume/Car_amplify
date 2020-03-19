var db = require("../models");
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
     //console.log(db);
     db.Make.findAll({}).then(function (makedata) {
      console.log(makedata);
      res.json(makedata);
    })
  });
  app.get("/api/examples/:id", function (req, res) {
    console.log(req.params.id);
    db.Model.findAll({ where: { makeId: req.params.id } }).then(function (modeldata) {
      //console.log(modeldata);
      res.json(modeldata);
    })
  });
}