const express = require('express'); //router
const dbms = require("./dbms"); //database file
const router = express.Router();

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // User is logged in
        return next();
    } else {
        // No user in the session
        
        return res.status(401).json({ message: "user not logged in"});
    }
}



/* creating the endpoint (name and path ) for the file */
router.post('/', ensureAuthenticated, async (req, res) => {  

    let id = req.body.proj_id;
    console.log(" project delete: ", id);
    
    //sql prompt that uploads new project with name and team, image route hardcoded 
    //also uploads route to desription file to assets 
    const sql = "DELETE FROM `project_assets` WHERE `project_id` = "+ id +"; " +
                "DELETE FROM `projects_list` WHERE `id` = "+ id +";";
                                //first one uploads new project to database and second is descript path to assetsS
            

    console.log(sql);

    dbms.dbquery(sql, (err, results) => {
        if (err){
            console.log("DB delete failed: ", err);
            return res.status(500).json({message: "DB delete failed"});}

        const isFetch = req.xhr || (req.headers.accept && req.headers.accept.includes("application/json"));

        if(isFetch){
            return res.status(201).json("complete");
        }

        return res.redirect('/projects');
        
    });


      

});

//exports the state of the router
module.exports = router;