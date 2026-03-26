var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

router.post('/', function(req, res, next) {
    //console.log('post works');
    page_route = req.body.page;

    res.render(page_route);
});


module.exports = router;
