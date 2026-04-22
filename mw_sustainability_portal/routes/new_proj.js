var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");

/* GET projects page. */
router.get('/' , async (req, res) => {
    console.log("GETTING NEW PROJ PAGE");
    res.render('new_proj');
});

router.post('/', function(req, res, next) {
    console.log("redirecting to new_proj");
    res.redirect('/new_proj');
});

module.exports = router;
