var express = require("express");
var router = express.Router();

//var Promise = require("bluebird");
//var request = require("request");
var rp = require("request-promise");

var config = require("../config/config");

router.get("/:userId", (req,res) => {
  var url = config.jsonUrl + "?userId=" + req.params.userId;
  rp({method: "GET", uri: url, json: true})
    .then((body) => {
      res.render('posts', {
        userId : req.params.userId,
        posts : body
      });
    }).catch((e) => {
      console.error("Error getting posts for user", req.params.userId);
      res.status(resp.statusCode).send(err);
    });
});

/*router.get("/:userId", (req,res) => {
    var url = config.jsonUrl + "?userId=" + req.params.userId;
    request.get(url, {json:true}, (err, resp, body) => {
        if(err) {
            console.error("Error getting posts for user", req.params.userId);
            res.status(resp.statusCode).send(err);
        }
        res.render('posts', {
            userId : req.params.userId,
            posts : body
        });
    });
});*/

module.exports = router;