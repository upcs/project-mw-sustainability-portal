/**
 * SERVER SIDE
 */
var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

router.post('/', function(req, res, next) {
    console.log('Pulling data from DB');

    let user = req.body.user;
    let pass = req.body.pass;

    dbms.dbquery( 'SELECT * FROM login where user =' + user, function (err, results) {
        if (err) {
            alert("Incorrect User or pass!");
        } else {
            //does the password equal the user input one?
            if (result.pass == pass)
            {
                alert("good pass!");
            }
            else
            {
                alert("Incorrect User or pass!");
            }
        }
    });
});