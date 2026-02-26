var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");

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

    dbms.dbquery( `SELECT * FROM projects_list`, function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else {
            res.render('projects', {records: results});
        }
    });
});

module.exports = router;
