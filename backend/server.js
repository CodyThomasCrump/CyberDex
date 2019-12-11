// Mongoose - allows us to set up schemas for the data we store in our MongoDB database. We will also set up our database connection using Mongoose.
const mongoose = require('mongoose');
// Express - framework for NodeJS. Handles our routing and  connection info (port, etc.). 
const express = require('express');
// Morgan - Handles logging stuff for databases.
const logger = require('morgan');
// Body-Parser - Makes sure the body of our requests is formatted correctly (in this case, we'll use JSON).
const bodyParser = require('body-parser');

// Import the getSecret function from the secret.js file
const getSecret = require('./secret');

// Import the Mongoose Schema for our data
const Data = require('./DataSchema');

// Constant to hold the port that we are going to use to connect
const API_PORT = 3001;

// Create an Express app that will run on our Node server and route our requests
const app = express();

// Create an Express router which actually handles the routing
const router = express.Router();

// Use Mongoose to set up a connection to the database
mongoose.connect(getSecret('dbUrl'), {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

// Reference to our database connection
let db = mongoose.connection;

// Use the database connection to print out an error if one occurs when we try to connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure body-parser and morgan
app.use(bodyParser.urlencoded({ extended: false })); //Used for parsing data formatted in the x-www-form-urlencoded format
app.use(bodyParser.json()); //Used for parsing data formatted in the JSON format
app.use(logger('dev'));

// Default route that will run whenever we first connect to the server
router.get('/', (req, res) => {
    console.log('MongoDB Connected');
});

// Route to retrieve data from the database
router.get('/getData', (req, res) => {
    // Use Mongoose to find data with the given schema
    Data.find((err, data) => {

        console.log(data);

        if (err) {
            return res.json({ success: false, error: err });
        }
        return res.json({ success: true, data: data });
    });
});

// Route that will put new information in the database
router.post('/postData', (req, res) => {
    // A new instance of the Mongoose Schema which we will send to the database.
    let newData = new Data();

    // Pull the ID and message from the body of the request.
    const { id, spreadsheetId, spreadsheetTitle, sheetTitle, sheetValue} = req.body;

    // If ID does not have a value and is not equal to 0 or if the any body variable doesn't have a value, return an error.
    if ((!id && id !== 0) || (!spreadsheetId || !spreadsheetTitle || !sheetTitle || !sheetValue)) {
        return res.json({
            success: false,
            error: 'INVALID INPUT'
        })
    }

    // Configure the Schema object.
    newData.id = id;
    newData.spreadsheetId = spreadsheetId;
    newData.spreadsheetTitle = spreadsheetTitle;
    newData.sheetTitle = sheetTitle;
    newData.sheetValue = sheetValue;

    // To save to the database.
    newData.save(err => {
        if (err) {
           return res.json({ success: false, error: err }); 
        } else return res.json({ success: true });
    });
});

// Route to delete a given object from our database.
router.delete('/deleteData', (req, res) => {
    Data.deleteOne({ id: req.body.id }, err => {
        if (err) {
            return res.json({ success: false, error: err });
        } else {
            return res.json({ success: true });
        }
    });
});

// Tell Express to use a certain path and to use the router we set up.
app.use('/api', router);

// Tell Express to listen for requests on the appropriate port.
app.listen(API_PORT, () => console.log('LISTENING ON PORT: ' + API_PORT));