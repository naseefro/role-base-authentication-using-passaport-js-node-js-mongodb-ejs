const express = require('express');
const JobData = require('../models/JobData');
const addJobRouter = express.Router();

addJobRouter.route('/')
    .get((req, res) => {
        res.render(
            'addjob'
        );
    });
addJobRouter.route('/add')
    .get((req, res) => {
        var item = {


            title: req.param("title"),
            location: req.param("location"),
            description: req.param("description"),
            salary: req.param("salary")

        }
        var job = new JobData(item);
        job.save();
        res.redirect('/company');

    });

module.exports = addJobRouter;