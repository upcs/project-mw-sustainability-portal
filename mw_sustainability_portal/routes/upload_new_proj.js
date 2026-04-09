/* Landon Harrison Version 0403 */
/* this js file is the direct contact for any js wishing to upload to the database and dbms.js */
/* uses multer, posts, and the creation of an sql prompt to upload a new project and file routes -- use of github ai */

const express = require('express'); //router
var multer = require('multer'); //file creation 
var path = require('path'); //file pathing
var fs = require('fs/promises'); //making directory
const rate_limit = require('express-rate-limit'); //setting a limit to the amount of DB uploads
const dbms = require("./dbms"); //database file
const router = express.Router();
const santizer = require('sanitize-filename'); //sanitizing input 

function ensureAuthenticated(req, res) {
    console.log("entered auth");
    console.log(req.session.isAuthenticated);
    if (req.session && req.session.isAuthenticated) {
        console.log("good");
        return;
    }
    console.log("bad");
    return res.redirect('/myLogin/admin_error');
}


const upload_limit = rate_limit({
    windowMs: 15*60*1000, //15 minutes
    max: 40, //max upload rate per 15 minutes
});
router.use(upload_limit);


/* creating the endpoint (name and path ) for the file */
router.post('/', upload_limit, async (req, res) => {  
    
    ensureAuthenticated(req, res);
    const raw_name = req.body.name; //name without sanitize
    let name = santizer(raw_name || ""); //sanitizing
    let team = req.body.team;
    let descript = req.body.description;
    console.log("New project upload: ", name, team, descript);

    /* working with file directory */
    let uploadDir = path.join( "public",  "assets", name);
    await fs.mkdir(uploadDir, {recursive : true});

    /* putting description path in variable and writing to file */
    let descript_path = path.join(uploadDir, "description.txt");
    await fs.writeFile(descript_path, descript, "utf8");

    /* not including "public" in path because it conflicts with render_project */
    uploadDir = path.join( "assets", name);
    descript_path = path.join(uploadDir, "description.txt");

    
    //sql prompt that uploads new project with name and team, image route hardcoded 
    //also uploads route to desription file to assets 
    const sql = "INSERT INTO `projects_list`( `name`, `team`, `image_route`)"+ 
                    "VALUES ('" + name + "','" + team + "', '/images/1600px_COLOURBOX9214366-3078337225.jpg');"
                    
                    + "INSERT INTO `project_assets` (`project_id`, `asset_route`, `is_text`) " +
                            "SELECT id, '"+descript_path+"', 1"  
                            +   " FROM `projects_list` "
                                +   "WHERE name = '"+name+"'"; 
                                //first one uploads new project to database and second is descript path to assetsS
            

    console.log(sql);

    dbms.dbquery(sql, (err, results) => {
        if (err){
            console.log("DB insert failed: ", err);
            return res.status(500).json({message: "DB insert failed"});}

        const isFetch = req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"));

        if(isFetch){
            return res.status(201).json({filePath});
        }

        return res.redirect('/newProj');
        
    });


      

});

//exports the state of the router
module.exports = router;





