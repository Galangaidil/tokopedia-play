require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const videosRouter = require('./routes/videos');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to Database'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/videos', videosRouter);

module.exports = app;
