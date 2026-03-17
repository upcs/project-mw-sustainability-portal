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
    console.log('Pulling data from DB');

    dbms.dbquery( 'SELECT name, team, image_route, page_route, html_generated FROM projects_list', function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else { 
            //to display projects in 2 different rows, split the results into a set of 2
            results_json = JSON.stringify(results);
            results_array = JSON.parse(results);

            splitted = split_results(results_array, 2);

            console.log(splitted)

            res.render('projects', {records1: splitted[0], records2: splitted[1]});
        }
    });
});

function split_results(arr, size) {
    const split = [];
    for (let i = 0; i < arr.length; i += size) {
        split.push(arr.slice(i, i + size));
    }

    return split;
}


module.exports = router;
