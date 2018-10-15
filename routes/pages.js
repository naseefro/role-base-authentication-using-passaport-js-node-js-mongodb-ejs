const router = require('express').Router()
    // Models
const User = require('../models/user')

// Static Pages ================================================================
router.get('/', function(req, res, next) {
    res.render('index')
})


router.get('/jobseeker', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isMember()) {
        res.render('jobseeker')
    } else {
        res.sendStatus(403) // Forbidden
    }
})

router.get('/company', function(req, res, next) {
    if (req.isAuthenticated() && req.user.isAuthor()) {
        res.render('company')
    } else {
        res.sendStatus(403) // Forbidden
    }
})

module.exports = router;