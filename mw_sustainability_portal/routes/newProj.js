var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");

function ensureAuthenticated(req, res, next) {
    console.log("ensuring auth");
    if (req.session && req.session.user && req.session.user.username) {
        console.log("auth check passed");
        return next();
    }
    console.log("auth check failed");
    return res.redirect('/mylogin/admin_error');
}

/* GET projects page. */
router.get('/' , (req, res) => {
    //const sqlQuery = 'SELECT asset_route FROM project_assets WHERE project_id = 72';
    //dbms.dbquery(sqlQuery, (err, results) => {
        // if (err) {
        //     res.send('There are no projects or I cannot collect data');
        // }
        //console.log(results); 
        res.render('newProj');
    //});

});

router.post('/', ensureAuthenticated, function(req, res, next) {
    // dbms.dbquery( 'SELECT asset_route FROM project_assets WHERE project_id = 72', function (err, results) {
    //     if (err) {
    //         res.send('Bad bad things happened');
    //     } else {
    //         console.log(results); 
            res.render('newProj');
    


 
});


module.exports = router;
