var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

/* GET projects page page. */
router.get('/' , async(req, res) => {
    var query = 'SELECT id, name, team, image_route, html_generated FROM projects_list'

    dbms.dbquery(query, function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else {
            console.log(results); 
            res.render('projects_list', {records: results});
        }
    });
    
});

router.post('/', function(req, res, next) {
    res.redirect('/projects');
});


module.exports = router;
