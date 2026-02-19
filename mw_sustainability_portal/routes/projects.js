var express = require('express');
var router = express.Router();

/* GET projects page page. */
router.get("/projects",(req,res,next)=>{
    res.render("projects.html")
    res.end()
})

module.exports = router;