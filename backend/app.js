require('dotenv').config();

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const HOST = '0.0.0.0';
const PORT = 3000;

const videosRouter = require('./routes/videos');
const seedsRouter = require('./routes/seeds');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (error) => console.error(error));

db.once('open', () => console.log('Connected to Database'));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(cors())

app.use('/api/videos', videosRouter);
app.use('/api/seeds', seedsRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});

module.exports = app;
