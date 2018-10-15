const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('morgan')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
const mongoose = require('mongoose')

const port = 3000

mongoose.connect("mongodb://localhost:27017/jobportal", { useNewUrlParser: true })



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'sessionId',
    secret: "mysecretkeythatiwillnottellyou",
    saveUninitialized: false,
    resave: false,

    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 24 * 60 * 60
    }),

    cookie: {
        secure: false,
        httpOnly: false,
        expires: new Date(Date.now() + 60 * 60 * 1000)
    }
}))
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
    res.locals.user = req.user || null;

    next();
})


const addJobRouter = require('./routes/addjobRoutes');
const jobsRouter = require('./routes/jobRoutes');
const jobportal = require('./routes/jobportal');
const viewprofile = require('./routes/profile');


app.use('/addjob', addJobRouter)
app.use('/company', jobsRouter)
app.use('/jobseeker', jobportal)
app.use('/auth', require('./routes/auth'))
app.use('/', require('./routes/pages'))
app.use('/profile', viewprofile)



app.listen(port, function() {
    console.log(`listening on port ${port}...`)
})