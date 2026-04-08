var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
//var app = express();

/* GET projects page page. */
router.get('/' , (req, res) => {
    const sqlQuery = 'SELECT asset_route FROM project_assets WHERE project_id = 72';
    dbms.dbquery(sqlQuery, (err, results) => {
        if (err) {
            res.send('There are no projects or I cannot collect data');
        }
        console.log(results); 
        res.render('indivProj', { records: results });
    });

});

router.post('/', function(req, res, next) {
    dbms.dbquery( 'SELECT asset_route FROM project_assets WHERE project_id = 72', function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else {
            console.log(results); 
            res.render('indivProj', {records: results});
        }
    });


 
});


module.exports = router;
