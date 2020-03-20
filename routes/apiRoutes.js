var db = require("../models");
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
     //console.log(db);
     db.Make.findAll({}).then(function (makedata) {
      // console.log(makedata);
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
  app.post("/api/examples", function(req, res){
    console.log('api example route fired')
    // console.log(req.body)
    db.PastSearch.create({
      year: req.body.year,
      make: req.body.make,
      model: req.body.model
    }).then(function(dbPastSearch){
      res.json(dbPastSearch)
    })
  });
  app.get("/api/searches", function (req, res) {
    //console.log(db);
    console.log('trying to search')
    db.PastSearch.findAll({}).then(function (pastsearch) {
    console.log('trying to search')
     console.log(pastsearch);
     res.json(pastsearch);
   })
 });
}