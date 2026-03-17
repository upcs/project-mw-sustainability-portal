var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

/* GET projects page page. */
router.get('/' , async(req, res) => {
    const sqlQuery = 'SELECT * FROM projects_list';
    dbms.dbquery(sqlQuery, (err, results) => {
        if (err) {
            res.send('There are no projects or I cannot collect data');
        }
        res.render('projects', { items: results });
    });

});

router.post('/', function(req, res, next) {
    dbms.dbquery( 'SELECT name, team, image_route, page_route, html_generated FROM projects_list', function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else {
            console.log(results); 
            res.render('projects', {records: results});
        }
    });
});


module.exports = router;
