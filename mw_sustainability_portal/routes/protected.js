var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
var authcheck = require('../public/javascripts/isauthenticated.js');


//this file will check if the user is authenticated and then either redirect
//to protected_form.ejs or the failed login page

//this should send a post to isauthenticated(?)

router.post('/', function(req, res, next) {
    console.log("JIAHDUEHFIEFIEFIEF");
    //send back an ejs for either protected page or error page?
    if(isauthenticated())
    {
        console.log("user authenticated");
        //res.send(protected_form.ejs);
        res.render('protected_form');
    }
    else
    {
        console.log("user is not logged in");
        //res.send(error.ejs);
        res.render('admin_error');
    }
});