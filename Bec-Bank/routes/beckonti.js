var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
mongo = require('mongodb');

/* Viser konti som JSON */
router.get('/json', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("BEC-Bank");
      dbo.collection("Konti").find({}).toArray(function (err, result) {
        if (err) throw err;
     
        var obj = {};
        obj.beckonti = result;
        res.json(obj);
        db.close();
      });
    });
  });
  
  /* Viser konti som en HTML side */
router.get('/', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("BEC-Bank");
      dbo.collection("Konti").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        var obj = {};
        obj.beckonti = result;
        res.render('beckonti', obj);
        db.close();
      });
    });
  });

  /* Post requests opretter en ny konti */
router.post('/json', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("BEC-Bank");
      var beckonti = {};
      beckonti.usernameId = req.body.usernameId;
      beckonti.name = req.body.name;
      beckonti.kontoNummer = req.body.kontoNummer;
      beckonti.indeestående = req.body.indeestående;
      beckonti.valutar = req.body.valutar;
      beckonti.renter = req.body.renter;
      beckonti.transaktioner = req.body.transaktioner;
  
      console.log("konti er oprettet ") ;
      dbo.collection("Konti").insertOne(beckonti, function (err, res) {
        if (err) throw err;
        console.log("1 konti er oprettet");
        db.close();
      });
      res.redirect("/beckonti/json");
    });
  });  
  router.post('/delete/:id', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("BEC-Bank");
    var id = req.params.id;
    dbo.collection("beckonti").deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  
    //res.json({ success: id })
    res.redirect("/beckonti");
  });
  });
module.exports = router;
