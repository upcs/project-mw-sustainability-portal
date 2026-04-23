//DESTROYS THE SESSION

const express = require('express');
//const session = require('express-session');
const router = express.Router();

router.get('/', function(req, res) {
    console.log("entered logout router get")
    if (req.session) {
        console.log('Session destroyed '+req.sessionID);
        req.session.destroy(err => {
        if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).render('admin_error', { message: 'Unable to log out' });
        }
        console.log('Session destroyed '+req.sessionID);
        console.log('connect.sid', req.cookies['connect.sid']);
        res.clearCookie('connect.sid');
        return res.redirect('/login_page');
        });
    } else {
        return res.redirect('/login_page');
    }
});

module.exports = router;