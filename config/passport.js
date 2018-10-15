const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {

    passport.use('local-login', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {


        User.findOne({ email: email }).then(function(user) {

            if (!user) {

                return done(null, false);
            }

            if (!user.validPassword(password)) {
                return done(null, false);
            }

            return done(null, user)
        }).catch(function(err) { done(err, false) });
    }));


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        if (req.user) {
            return done(null, req.user);
        }

        User.findOne({ email: email }).then(function(user) {

            if (user) {

                return done(null, false);
            }

            new User({
                email: email,
                password: User.generateHash(password),
                name: req.body.name,
                location: req.body.location,
                role: req.body.role
            }).save(function(err, savedUser) {
                if (err) {
                    return done(err, false)
                }
                return done(null, savedUser);
            })
        }).catch(function(err) { done(err, false) });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};