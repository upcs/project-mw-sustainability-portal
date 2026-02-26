const express = require("express");

const router = express.Router();

//Only admin can access
router.get("/admin", (req,res) => {
    res.json({message: "Welcome admin"})
});
//Both admin and manager
router.get("/manager", (req,res) => {
    res.json({message: "Welcome manager"})
});
//All can accsess
router.get("/user", (req,res) => {
    res.json({message: "Welcome user"})
});

module.exports = router;