var express = require('express');
var router = express.Router();

/* GET projects page page. */
router.get('/', function(req, res, next) {
    alert("Clickedspecial1")
    res.render("projects.html")
    res.end()
});
router.get("/projects",(req,res,next)=>{
    alert("Clickedspecial2")
    res.render("projects.html")
    res.end()
})

module.exports = router;