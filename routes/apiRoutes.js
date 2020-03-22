var db = require("../models");
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Make.findAll({}).then(function (makedata) {
      res.json(makedata);
    })
  });
  //Get specific models
  app.get("/api/examples/:id", function (req, res) {
    db.Model.findAll({ where: { makeId: req.params.id } }).then(function (modeldata) {
      res.json(modeldata);
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
    db.PastSearch.findAll({}).then(function (pastsearch) {
      res.json(pastsearch);
    })
  });
app.delete("/api/delete", function(req, res){
  db.PastSearch.destroy({
    where:{},
    truncate: true
  }).then(function(){
    res.end()
  });
});
}