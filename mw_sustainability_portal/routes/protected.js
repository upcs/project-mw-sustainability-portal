var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
var authcheck = require('../public/javascripts/isauthenticated.js');
var session = require('express-session');

function isauthenticated()
{
    // if(session)
    // {
    //     return next;
    // }

    //for debugging:

    // Check if the 'user' property exists in the session object
    if (req.session.user) {
        // User is logged in
        console.log('Session exists and has a user:', req.session.user);
        return true;
    } else {
        // No user in the session
        console.log('No user in the session');
        return false;
    }
}

//this file will check if the user is authenticated and then either redirect
//to protected_form.ejs or the failed login page

router.post('/', isauthenticated(), function(req, res, next) { //recieves a post
    console.log("entered protection function (recieved post)");

    if(currSession.isauthenticated)
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