const express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");

function ensureAuthenticated(req, res, next) {
    console.log("ensuring auth");
    if (req.session && req.session.user && req.session.user.username) {
        console.log("good");
        return next();
    }
    console.log("bad");
    return res.redirect('/mylogin/admin_error');
}

router.post('/', function(req, res, next) { //recieve a post
    console.log('Pulling data from DB');
    let user = req.body.user;
    let pass = req.body.pass;
    console.log('get db user and pass');
    var query = "SELECT * FROM login WHERE user = '" + user + "'";
    var correct = 1; //1 = wrong pass
    dbms.dbquery(query, function (err, results) {
        if (err) {
            console.log("Incorrect User!");
        } else {
            //does the password equal the user input one?
            if (results[0].pass == pass)
            {   
                console.log("good pass!");

                // //call router for rendering admin view next step
                // // res.render('admin_view'); //should be indirect render, go through protected.js
                req.session.user = { id: null, username: user };
                req.session.isAuthenticated = true;

                req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.render('admin_error', { message: 'Session error' });
                }
                return res.redirect('/mylogin/admin_view'); // indirect render
                });

                
            }
            else
            {
                console.log("Incorrect pass!");
                res.redirect('admin_error');
            }
        }
    });
});

//secure get url
router.get('/admin_view', ensureAuthenticated, function(req, res) {
    res.render('admin_view', { user: req.session.user });
    console.log("entered the get");
});

module.exports = router;
