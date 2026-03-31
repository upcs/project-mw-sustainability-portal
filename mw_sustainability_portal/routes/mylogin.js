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
    console.log('got db user and pass');
    var query = 'select * from login'; //need to fix to select only 1
    var correct = 1; //1 = wrong pass
    dbms.dbquery( query, function (err, results) {
        if (err) {
            console.log("Incorrect User!");
        } else {
            //does the password equal the user input one?
            if (results[0].pass == pass)
            {
                console.log("good pass!");

                //create session for authenticated user
                let currSession = req.session;
                //currSession.user =
                currSession.authenticated = true;

                correct = 0;
                //call router for rendering admin view next step
                res.render('admin_view'); //should be indirect render, go through protected.js
            }
            else
            {
                console.log("Incorrect pass!");
                res.render('admin_error')
            }
        
        }
    });
});

module.exports = router;
