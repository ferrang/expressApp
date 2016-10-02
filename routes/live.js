var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('live', {title: "This is socket.io live!"});
});

module.exports = router;