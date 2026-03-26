var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

router.post('/', function(req, res, next) {
    console.log('post works');
});


module.exports = router;
