/**
 * @overview: This class is the route for the auth section of the api and takes care of all the business logic.
 */

'use strict'

// Dependencies
import express from 'express'
import Route from '../Route'
import User from '../../../models/User'

const router = express.Router()

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
    this.root(false)
    this.register(false)
    this.login(false)
  }

  /**
   * All methods take:
   * @param passport - which is a boolean value to include passport auth or not
   */

  root(passport) {
    this.createRoute('get', '/', (req, res) => {
      res.send('Hello from <b>ROOT</b> path of auth')
    }, passport)
  }

  register(passport) {

    this.createRoute('post', '/register', async (req, res) => {
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }

      try {
        const newUser = await User(user).save()
        res.send(newUser)
      } catch(e) {
        console.log(e)
      }

    }, passport)
  }

  login(passport) {
    this.createRoute('get', '/login', (req, res) => {
      res.send('Hello from <b>LOGIN</b> path of auth')
    }, passport)
  }
}
