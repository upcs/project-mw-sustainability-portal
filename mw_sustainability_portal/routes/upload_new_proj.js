/* Landon Harrison Version 0403 */
/* this js file is the direct contact for any js wishing to upload to the database and dbms.js */
/* uses multer, posts, and the creation of an sql prompt to upload a new project and file routes -- use of github ai */

let express = require('express'); //router
var multer = require('multer'); //file creation 
var path = require('path'); //file pathing
var fs = require('fs/promises'); //making directory
let rate_limit = require('express-rate-limit'); //setting a limit to the amount of DB uploads
let dbms = require("./dbms"); //database file
let router = express.Router();
let santizer = require('sanitize-filename'); //sanitizing input 

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // User is logged in
        return next();
    } else {
        // No user in the session
        console.log("not logged in");
        return res.redirect('/login.html');
    }
}

/* Image Directory and Storage */
let upImgDir = path.join(process.cwd(), "public",  "images");
let tmpImgDir = path.join(upImgDir, "_temp"); //temporary directory until we can use project name in post for dirPath
fs.mkdir(tmpImgDir, {recursive: true});

/* configuring multer to take image uploads */
let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, upImgDir )
    },
    filename: (req, file, cb) => {
        let uniqueSuffix = Math.round(Math.random()*1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});
let up_storage = multer({ storage });

/* Sets a limit on uploading, to prevent crash */
let upload_limit = rate_limit({
    windowMs: 15*60*1000, //15 minutes
    max: 40, //max upload rate per 15 minutes
});


/* creating the endpoint (name and path ) for the file */
router.post('/', upload_limit, ensureAuthenticated, up_storage.single("uploadFile"), async (req, res) => {  

    
    let raw_name = req.body.name; //name without sanitize
    let name = santizer(raw_name || ""); //sanitizing
    let team = req.body.team;
    let descript = req.body.description;
    let img = req.file.filename;
    console.log("New project upload: ", name, team, descript, img);

    /* file directory for project description */
    let upload_dir = path.join( "public",  "assets", name);
    await fs.mkdir(upload_dir, {recursive : true});

    /* putting description path in variable and writing to file */
    let descript_path = path.join(upload_dir, "description.txt");
    await fs.writeFile(descript_path, descript, "utf8");

    /* img directory */
    let imgDir_correct = path.join(upImgDir, name); //where we want image to end up 
    await fs.mkdir(imgDir_correct, {recursive : true});

    /* Assinging old and new path for image to move from temp to final */
    let old_path = req.file.path;
    let new_path = path.join(imgDir_correct, req.file.filename);
    await fs.rename(old_path, new_path);
    let image_route = path.posix.join("/images", name, req.file.filename); //image route how render_project wants it, dynamically pulls

    /* not including "public" in path because it conflicts with render_project */
    uploadDir = "assets/"+name;//path.join( "assets", name);
    descript_path = uploadDir + "/description.txt";//path.join(uploadDir, "description.txt");

    
    //sql prompt that uploads new project with name and team, image route hardcoded 
    //also uploads route to desription file to assets 
    let sql = "INSERT INTO `projects_list`( `name`, `team`, `image_route`)"+ 
                    "VALUES ('" + name + "','" + team + "', '"+ image_route + "');"
                    
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

        let isFetch = req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"));

        if(isFetch){
            return res.status(201).json({filePath});
        }
        
    });

    return res.redirect('/projects');
      

});

//exports the state of the router
module.exports = router;





