/**
 * @overview: This class is the route for the auth section of the api and takes care of all the business logic.
 */

'use strict'

// Dependencies
import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Route from '../Route'
import Database from '../../database/Database'
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
    this.root(true)
    this.register(false)
    this.login(false)
  }

  /**
   * All methods take:
   * @param passport - which is a boolean value to include passport auth or not
   */

  // Root for auth route, Use this format for all routes
  root(passport) {
    this.createRoute('get', '/', (req, res) => {
      res.send('Hello from <b>ROOT</b> path of auth')
    }, passport)
  }

  // Register a user to the database
  register(passport) {
    this.createRoute('post', '/register', async (req, res) => {
      try {
        // Generate salt and hashed password
        const saltRounds = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        const user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.email,
          password: hash
        }

        const newUser = await User(user).save()
        res.json({
          success: true,
          newUser
        })
      } catch(e) {
        res.sendStatus(500)
        console.log(e)
      }
    }, passport)
  }

  // Authenticate a user
  login(passport) {
    this.createRoute('post', '/login', async (req, res) => {
      try {
        const username = req.body.username
        const password = req.body.password
  
        // Find the user by username from the database
        const user = await User.findOne({ username })
  
        if(!user) {
          // Send wrong username error
          res.json({ error: 'The username you have entered does not exist' })
          return
        }

        // Compare found user password with inputed password from client
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {
          const db = new Database()
          // Create a token that expires in 1 week
          const token = await jwt.sign({ data: user }, db.getConnectionString().secret, {
            expiresIn: 604800 // 1 week
          })

          // Send the token when user data to the client
          res.json({
            success: true,
            token: 'Bearer ' + token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          })
        } else {
          // Send wrong password error
          res.json({ error: 'The password you have entered does not match' })
          return
        }
      } catch(e) {
        res.sendStatus(500)
        console.log(e)
      }
    }, passport)
  }
}
