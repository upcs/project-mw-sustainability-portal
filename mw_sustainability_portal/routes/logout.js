//should destroy the session
//called by admin view logout button /** DO THISS */
//will send a post

const express = require('express');
//const session = require('express-session');
const router = express.Router();

router.get('/', function(req, res) {
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
    return res.redirect('/login.html');
    });
} else {
    return res.redirect('/login.html');
}
});

module.exports = router;