/**
 * 4/7/26
 * this has no functionality currently
 */

function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user && req.session.user.username) {
        return next();
    }
    return res.redirect('/mylogin/admin_error');
}

app.get('/admin_view', ensureAuthenticated, (req, res) => {
    
    const actiontype = req.query.action; //example input: /protected_pages?action=edit_project

    if(actiontype === 'edit_project') {
        //example input: /protected_pages?action=edit_project,projectname=sanitation
        projectname = req.query.projectname;
        res.render('edit_project', { project: projectname });
    }
    else if (actiontype === 'upload') {
        projectname = req.query.projectname;
        res.render('edit_project_upload', { project: projectname });
    }
    else if (actiontype === 'logout') {
        //projectname = req.query.projectname; ??
        res.render('logout');
    }
    else {
        res.redirect('/admin_view');
    }

});