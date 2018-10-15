const express = require('express');
const jobportal = express.Router();
const mongoose = require('mongoose');
const JobData = require('../models/JobData');


jobportal.route('/')
    .get((req, res) => {
        JobData.find()
            .then(function(jobs) {
                res.render(
                    'jobseeker', {
                        jobs
                    });
            });

    });


module.exports = jobportal;