const express = require('express');
const jobsRouter = express.Router();
const mongoose = require('mongoose');
const JobData = require('../models/JobData');


jobsRouter.route('/')
    .get((req, res) => {
        JobData.find()
            .then(function(jobs) {
                res.render(
                    'company', {
                        jobs
                    });
            });

    });

jobsRouter.route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id;
        JobData.findOne({ _id: id })
            .then(function(job) {
                res.render(
                    'editjob', {
                        job
                    });
            });
    });

jobsRouter.post('/edit/:id', function(req, res) {
    JobData.findOne({ _id: req.params.id }, function(err, data) {
        var colloction = data;
        colloction.title = req.body.title;
        colloction.location = req.body.location;
        colloction.description = req.body.description;
        colloction.salary = req.body.salary;

        colloction.save(function(err, data) {
            if (err)
                throw err;
            res.json(data);
        });
    })
})

jobsRouter.route("/delete/:id")
    .get((req, resp) => {
        const id = req.params.id;
        JobData.findOneAndRemove(id).then(function(value) {
            resp.redirect("/company");
        });
    })

module.exports = jobsRouter;