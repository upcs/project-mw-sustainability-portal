var express = require('express');
var router = express.Router();
var dbms = require("./dbms.js");
const url = require('url');
const { concat } = require("async");
const fs = require('fs').promises;
const path = require('path');
var app = express();

/* GET projects page. */
router.get('/:id', async (req, res) => {
    console.log("PARAMS:", req.params);

    var id = req.params.id;

    //Get name + team from projects_list
    var projectQuery = 'SELECT name, team FROM projects_list WHERE id = ' + id;

    dbms.dbquery(projectQuery, function (err, projectInfo) {
        if (err) return res.send('Error loading project info');

        const name = projectInfo[0].name;
        const team = projectInfo[0].team;

        // Get assets from project_assets
        const assetQuery = 'SELECT * FROM project_assets WHERE project_id =' + id;

        dbms.dbquery(assetQuery, async function (err, results) {
            if (err) return res.send('Error loading assets');

            let desc = "";
            let img_arr = [];
            let textContent = "";

            results.forEach(asset => {
                if (asset.is_text === 1) desc = asset.asset_route;
                if (asset.is_image === 1) img_arr.push(asset.asset_route);
            });

            if (desc) {
                try {
                    textContent = await read_txt(desc);
                } catch {
                    textContent = "Error loading description";
                }
            }

            var data = {images: img_arr, description : textContent,
                        proj_name : name, proj_team : team, proj_id : id};
                        
            console.log(data);
            res.render('project_page', data);
        });
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
