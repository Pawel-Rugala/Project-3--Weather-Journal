// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});

// POST ROUTE
app.post('/data', (req, res) => {
  // destructure req.body
  const {
    main: { temp },
    feel,
  } = req.body;

  // create new variable with data from req.body
  const data = {
    temp,
    feel,
  };

  // overwrite projectData
  projectData = { ...data };

  //just a check if data is visible on server
  console.log(projectData);
});

// GET ROUTE
app.get('/all', (req, res) => {
  res.send(projectData);
});
