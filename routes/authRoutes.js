const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile','email'],
        prompt: 'select_account'
    }));

    app.get('/auth/google/callback', 
        passport.authenticate('google'), 
        (req,res) => {
            res.redirect('/ranking');
        });

    app.get('/api/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
        //res.redirect('https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}