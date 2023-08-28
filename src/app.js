const express = require('express');


const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');


app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(cors());

const mongodbHealth = require('./middleware/mongoHealth');

const userRoutes = require('./routes/userRoutes');
const sleepRoutes = require('./routes/sleepRoutes');
const moodRoutes = require('./routes/moodRoutes');
const activityRoutes = require('./routes/activityRoutes');


app.use(mongodbHealth);

app.use('/users', userRoutes);
app.use('/sleep', sleepRoutes);
app.use('/mood', moodRoutes);
app.use('/activity', activityRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
