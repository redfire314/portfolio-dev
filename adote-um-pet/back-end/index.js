// Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conn = require('./db/conn');
const apisRoutes = require('./routes/api/apisRoutes');

const app = express();
const port = process.env.EXPRESS_PORT;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Routes
app.use('/api', apisRoutes);

// Start
conn()
    .then((success) => {
        console.log('Mongoose connected.');

        app.listen(port, () => {
            console.log(`Express running on port ${port}.`);
        });
    })
    .catch((err) => {
        console.log("Couldn't connect to the MongoDB server.", err);
    });
