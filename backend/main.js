const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const { findUrlInDb, shorten, getStats, incrementEntry } = require('./routeHandlers');
const connectDB = require('./db/');

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/create', shorten);
app.get('/stats/*', getStats);
app.post('/increment', incrementEntry);
app.get('/*', findUrlInDb);

connectDB().then(err => {
    if (err) console.log("ERROR", err);
    console.log("Connected!");
		app.listen(port, () => console.log(`server is listening on ${port}`))
});
