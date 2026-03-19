/* Landon Harrison Version 0318 */
/* this js file is the direct contact for any js wishing to upload to the database and dbms.js */
/* uses multer, posts, and the creation of an sql prompt to upload files -- use of github ai */

const express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

console.log('declaring router');

const dbms = require("./dbms");

const router = express.Router();


/* working with file directory */
const uploadDir = path.join(process.cwd(), "public",  "images");
fs.mkdirSync(uploadDir, {recursive : true});


/* configuring multer to take image uploads */
const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
})

console.log('about to declare upload');

const upload = multer({ storage });

console.log('about to enter upload post');

/* creating the endpoint (name and path ) for the file */
router.post('/', upload.single("uploadFile"), async (req, res) => {  
    
    console.log('entered upload post');

    const file = req.file;
    if(!file){
        return res.status(400).send({message: "please select an image file"});
    }

    //creating filename and filepath 
    const fileName = file.filename;
    const filePath = path.posix.join("images", fileName);

    //var projectId = 72; //not in use, just for testing

    //change sql prompt in next spring, using id 18 as hardcoded value 
    const sql = "INSERT INTO `project_assets`(`project_id`, `asset_route`, `is_video`, `is_image`, `is_text`) VALUES ('72','" + filePath + "' ,'0' ,'1','0');"
   

    dbms.dbquery(sql, (err, results) => {
        if (err) return res.status(500).json({message: "DB insert failed"});

        const url = `${req.protocol}://${req.get("host")}/${filePath}`;
        return res.status(201).json({filePath});
    });
    
        
});

//exports the state of the router
module.exports = router;





