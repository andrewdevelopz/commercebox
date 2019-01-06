/**
 * @overview: This class is the route for the inventory section of the api and takes care of all the business logic.
 */

'use strict'

// Dependencies
import express from 'express'
const router = express.Router()
import Route from '../Route'

export default class Inventory extends Route {
  constructor(path, app) {
    // Super takes:
    // - path which is received from when instantiating the class
    // - app which is received from when instantiating the class
    // - router which is received from the dependencies from above
    super(path, app, router)
    // Run all the methods to each path of the route
    this.run()
  }

  run() {
    this.root()
    this.test()
  }

  root() {
    this.createRoute('get', '/', (req, res) => {
      res.send('Hello from <b>ROOT</b> path of inventory')
    })
  }

  test() {
    this.createRoute('get', '/test', (req, res) => {
      res.send('Hello from <b>TEST</b> path of inventory')
    })
  }
}
