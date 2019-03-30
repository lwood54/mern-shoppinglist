// makes using/creating node server easier
const express = require('express');

// mongoose helps make using mongoDB easier
const mongoose = require('mongoose');

// body-parser takes request and get data from the body
const bodyParser = require('body-parser');

// import path (a provided Node module)
const path = require('path');

// allows use of .env variables for security and not uploading passwords onto github
// require('dotenv').config();

// notfiy server to look for routes (these could be put in server.js, but separating this cleans codebase)
const items = require('./routes/api/items');

// intialize express app
const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// DB config (another route is to use 'dotenv' and create the .env file that we can .gitignore)
const db = require('./config/keys').mongoURI;

// connect a mongoDB database (I am using mLab cloud mongDB)
mongoose.connect(db)
        .then(() => {
                console.log('MongoDB Connected...');
        })
        .catch(err => {
                console.log('Error: ', err);
        });

// Use routes
// anything that comes in and uses /api/items, will refer to the items variable (which connects to the
// routes/api/items.js file)
app.use('/api/items', items);

// give build instructions for heroku deployment
// Serve static assets 'build' folder if in production
if (process.env.NODE_ENV === 'production') {
        // set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}

// set port that is flexible and may need to be changed by cloud service
const port = process.env.PORT || 5000;

app.listen(port, () => {
        console.log(`Server started on ${port}!`);
});
