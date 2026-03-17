/**
 * SERVER SIDE
 */
var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
//const { concat } = require("async");
//var app = express();

router.post('/', function(req, res, next) {
    console.log('Pulling data from DB');
    let user = req.body.user;
    let pass = req.body.pass;
    console.log('got req user and pass');
    var query = 'select * from login';
    dbms.dbquery( query, function (err, results) {
        console.log("results :  ");
        console.log(results);
        console.log(pass);
        console.log(results[0].pass);
        if (err) {
            console.log("Incorrect User!");
        } else {
            //does the password equal the user input one?
            if (results[0].pass == pass)
            {
                console.log("good pass!");
                //render admin view
                res.render('admin_view');
            }
            else
            {
                console.log("Incorrect pass!");
            }
        }
    });
});

module.exports = router;
