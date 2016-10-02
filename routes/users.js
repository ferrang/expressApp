var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

// Param middleware
router.param("name", function(req, res, next, name){
    console.log("Validating name:", name);
    if(name === "admin") {
        return res.status(403).send("Secure page");
    }
    req.name = name;
    next();
});

router.route("/:name").get(function(req,res){
    res.json({
        name : req.params.name,
        role : "user"
    });
});

module.exports = router;
