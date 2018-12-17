var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('afterlogin', { title: 'Your are now login' });
});

module.exports = router;
