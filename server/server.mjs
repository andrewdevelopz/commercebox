'use strict'

// Dependencies
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import Database from './config/database/Database'

// Importing routes class
import Auth from './config/routes/auth/Auth'
import Inventory from './config/routes/toolbox/Inventory'

class Server {
  constructor() {
    this.db = new Database()
    this.app = express()
    // Connect to db with mongoose
    mongoose.connect(this.db.getConnectionString().database, { useNewUrlParser: true })
      .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err))
    // Initiate the server
    this.init(this.app)
  }

  // All server logic for the http and https server
  unifiedServer(app) {
    // Execute npm libraries

    /**
     * @todo Currently we have cors enabled for all routes. Make sure to configure this properly in the future.
     * @link https://expressjs.com/en/resources/middleware/cors.html
     */
    app.use(cors())
    app.use(bodyParser.json())

    // Instantiate routes class
    new Auth('/api/auth', app)
    new Inventory('/api/inventory', app)

    app.get('/', (req, res) => {
      res.send('Invalid Endpoint')
    })
  }

  // Instantate the HTTP server
  httpServer(app) {
    this.unifiedServer(app)

    // Listen on PORT
    const port = process.env.PORT || 3000
    app.listen(port, err => err ? console.log(err) : console.log(`Server started on port: ${port}`))
  }

  // Init script method
  init(app) {
    this.httpServer(app)
  }
}

export default new Server()
