const express = require('express');
const viewprofile = express.Router();
const User = require('../models/user');

viewprofile.route('/view/:id')
    .get((req, res) => {
        const id = req.params.id;
        User.findOne({ _id: id })
            .then(function(user) {
                res.render(
                    'viewprofile', {
                        user
                    });
            });
    })
viewprofile.route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id;
        User.findOne({ _id: id })
            .then(function(user) {
                res.render(
                    'editprofile', {
                        user
                    });
            });
    })




viewprofile.post('/edit/:id', function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, data) {
        var colloction = data;
        colloction.email = req.body.email;
        colloction.name = req.body.name;
        colloction.location = req.body.location;

        colloction.save(function(err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    });
});
module.exports = viewprofile;