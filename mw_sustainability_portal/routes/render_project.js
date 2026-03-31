var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const { concat } = require("async");
var app = express();

router.post('/', function(req, res, next) {
    var name = req.body.proj_name;
    var team = req.body.proj_team;
    var id = req.body.proj_id;

    var query = 'SELECT * FROM project_assets WHERE project_id = ' + id;

    dbms.dbquery(query, function (err, results) {
            if (err) {
                res.send('Bad bad things happened');
            } else {
                var data = {records: results, proj_name : name, proj_team : team};
                //console.log(data);
                res.render('project_page', data);
            }
        });
});


module.exports = router;
