'use strict'

// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Instantiate the container
const server = {};

// All server logic for the http and https server
server.unifiedServer = (app) => {
  // Execute npm libraries

  /**
   * @todo Currently we have cors enabled for all routes. Make sure to configure this properly in the future.
   * @link https://expressjs.com/en/resources/middleware/cors.html
   */
  app.use(cors());
  app.use(bodyParser.json());

  // Setting and handling routes
  const index = require('./routes/index');

  app.use('/', index);
}

// Instantate the HTTP server
server.httpServer = (app) => {
  server.unifiedServer(app);
  
  // Listen on PORT
  const port = process.env.PORT || 3000;
  app.listen(port, err => err ? console.log(err) : console.log(`Server started on port: ${port}`));
}

// Instantiate init script
server.init = () => {
  server.httpServer(app);
};

// Init script
server.init();

module.exports = server;
