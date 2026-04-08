var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const url = require('url');
const { concat } = require("async");
const fs = require('fs').promises;
const path = require('path');
var app = express();

/* GET projects page. */
router.get('/' , async(req, res) => {
    var team = req.query.team;
    var name = req.query.name;
    var id = req.query.id;

    var query = 'SELECT * FROM project_assets WHERE project_id = ' + id;

    dbms.dbquery(query, async function (err, results) {
        if (err) {
            res.send('Bad bad things happened');
        } else {
            var desc = "";
            var img_arr = [];
            
            results.forEach(function(asset) { 
                if (asset.is_text === 1) { 
                    desc = asset.asset_route;
                } else if (asset.is_image === 1) {
                    img_arr.push(asset.asset_route);
                }
            });

            if (desc) {
                try {
                    textContent = await read_txt(desc);
                } catch (e) {
                    console.error(e);
                    textContent = "Error loading description";
                }
            }

            var data = {images: img_arr, description : textContent,
                        proj_name : name, proj_team : team};
            console.log(data);
            res.render('project_page', data);
        }
    });
});

router.post('/', function(req, res, next) {
    var name = req.body.proj_name;
    var team = req.body.proj_team;
    var id = req.body.proj_id;

    res.redirect(url.format({
       pathname:"/render_project",
       query: {
          "name": name,
          "team": team,
          "id" : id
        }
     }));
});

async function read_txt(route) {
    var filePath = path.join(
        __dirname,
        '..', '..', // go up from src/utils → project root
        'mw_sustainability_portal/public',
        route
    );

    const data = await fs.readFile(filePath);
    return data.toString();
}


module.exports = router;
