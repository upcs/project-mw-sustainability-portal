/* Landon Harrison Version 0318 */
/* this js file is the direct contact for any js wishing to upload to the database and dbms.js */
/* uses multer, posts, and the creation of an sql prompt to upload files -- use of github ai */

const express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs/promises');
const rate_limit = require('express-rate-limit');
const dbms = require("./dbms");
const router = express.Router();
const santizer = require('sanitize-filename');


const upload_limit = rate_limit({
    windowMs: 15*60*1000, //15 minutes
    max: 40, //max upload rate per 15 minutes
});

router.use(upload_limit);

/* creating the endpoint (name and path ) for the file */
router.post('/', upload_limit, async (req, res) => {  
    
    console.log('entered upload post');

    const raw_name = req.body.name;
    let name = santizer(raw_name || "");
    let team = req.body.team;
    let descript = req.body.description;
    console.log("New project upload: ", name, team, descript);

    /* working with file directory */
    const uploadDir = path.join(process.cwd(), "public",  "assets", name);
    await fs.mkdir(uploadDir, {recursive : true});
   

    /* putting description path in variable and writing to file */
    const descript_path = path.join(uploadDir, "description.txt");
    await fs.writeFile(descript_path, descript, "utf8");


    console.log("New project upload: ", name, team);
    // while(!file){
      //   return res.status(400).send({message: "please select an image file"});
    // }

    //creating filename and filepath 
    
    //change sql prompt in next spring, using id 18 as hardcoded value 
    const sql = "INSERT INTO `projects_list`( `name`, `team`, `image_route`) VALUES ('" + name + "','" + team + "', '/images/1600px_COLOURBOX9214366-3078337225.jpg');"+
        "INSERT INTO 'project_assets`(`project_id`,`asset_route`, `is_text`) VALUES ((SELECT id FROM `project_list` WHERE name = '"+ name+"'), '"+descript_path+"', 1)";

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





