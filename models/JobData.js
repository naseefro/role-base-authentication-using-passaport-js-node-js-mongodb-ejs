const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jobportal', { useNewUrlParser: true });
const Schema = mongoose.Schema;

var NewJobSchema = new Schema({

    title: String,
    location: String,
    description: String,
    salary: String
});
var JobData = mongoose.model('Job-Data', NewJobSchema);

module.exports = JobData;