/**
 * @overview: This class is the route for the auth section of the api and takes care of all the business logic.
 */

'use strict'

// Dependencies
import express from 'express'
const router = express.Router()
import Route from '../Route'

export default class Auth extends Route {
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
    this.login()
  }

  root() {
    this.createRoute('get', '/', (req, res) => {
      res.send('Hello from <b>ROOT</b> path of auth')
    })
  }

  login() {
    this.createRoute('get', '/login', (req, res) => {
      res.send('Hello from <b>LOGIN</b> path of auth')
    })
  }
}
