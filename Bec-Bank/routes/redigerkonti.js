var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
mongo = require('mongodb')
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res, next) {
    res.render('redigerkonti', { title: 'BEC Bank' });
  }); 


 /* Post requests opretter en ny konti */
 router.post('/put', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("BEC-Bank");
      var usernameId = req.body.usernameId;
      var oldValues = {usernameId:usernameId}
      var newValues={$set: {usernameId: req.body.usernameId, name: req.body.name, kontoNummer: req.body.kontoNummer, indeestaaende: req.body.indeestaaende, valutar: req.body.valutar, renter: req.body.renter, transaktioner: req.body.transaktioner}}
    
        dbo.collection("Konti").updateOne(oldValues, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 konti er oprettet");
        db.close();
      });
      res.redirect("/beckonti");
    });
  }); 
  module.exports = router;