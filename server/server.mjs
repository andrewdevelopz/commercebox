'use strict'

// Dependencies
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

// Importing routes
import index from './routes/index'
import inventory from './routes/inventory'
import orders from './routes/orders'
import shipping from './routes/shipping'
import todos from './routes/todos'
import auth from './routes/auth'

const app = express()

// Instantiate the container
const server = {}

// All server logic for the http and https server
server.unifiedServer = (app) => {
  // Execute npm libraries

  /**
   * @todo Currently we have cors enabled for all routes. Make sure to configure this properly in the future.
   * @link https://expressjs.com/en/resources/middleware/cors.html
   */
  app.use(cors())
  app.use(bodyParser.json())

  // Handling routes
  app.use('/', index)
  app.use('/inventory', inventory)
  app.use('/orders', orders)
  app.use('/shipping', shipping)
  app.use('/todos', todos)
  app.use('/auth', auth)
}

// Instantate the HTTP server
server.httpServer = (app) => {
  server.unifiedServer(app)
  
  // Listen on PORT
  const port = process.env.PORT || 3000
  app.listen(port, err => err ? console.log(err) : console.log(`Server started on port: ${port}`))
}

// Instantiate init script
server.init = () => {
  server.httpServer(app)
}

// Init script
server.init()

export default server
