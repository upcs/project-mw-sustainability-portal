var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

router.post('/', function(req, res, next) {
    //var route = req.body.info.page_route;

    res.render('project_template');
    
});


module.exports = router;
