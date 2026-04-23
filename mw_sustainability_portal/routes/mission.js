var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");

/* GET projects page page. */
router.get('/' , async (req, res) => {
    res.render('mission');
});

router.post('/', function(req, res, next) {
    res.redirect('/mission');
});

module.exports = router;
