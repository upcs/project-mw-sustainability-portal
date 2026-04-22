var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

/* GET projects page. */
router.get('/' , async (req, res) => {
    res.render('newProj');
});

router.post('/', function(req, res, next) {
    res.redirect('/newProj');
});

module.exports = router;
