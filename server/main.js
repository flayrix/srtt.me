const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const Sentry = require('@sentry/node');
const config = require('./config');

// The Sentry middleware for error logging
Sentry.init({
    dsn: config.SENTRY_DSN
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Establish Connection
mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true
});
let db = mongoose.connection;

// Check connection
db.once('open', function () {
    console.log('> Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(err);
});

app.set('trust proxy', true);
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use((req, res, next) => {
    req.realIp = req.headers['x-real-ip'] || req.connection.remoteAddress || '';
    return next();
});

// 
app.use(express.static(path.join(__dirname + '/../client/dist/srtt')));
app.use(express.static(path.join(__dirname + '/../static')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/dist/srtt/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('client/dist/srtt/index.html'));
});

app.get('/api/', (req, res) => {
    const url = req.params.id;
});

app.get('/:id', (req, res) => {
    const url = req.params.id;
});

app.listen(config.PORT, err => {
    if (err) throw err;
    console.log(`> Server running on http://localhost:${config.PORT}`);
});