const router = require('express').Router()
const passport = require('passport');

router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/auth/signup',
    failureFlash: false
}), function(req, res, next) {
    res.redirect('/')
});

router.get('/login', function(req, res, next) {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login')
    }
})

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/auth/login',
    failureFlash: false
}), function(req, res, next) {

    res.redirect('/');
});



router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
    req.flash('success_msg', 'You are logged out');
});




module.exports = router;