/**
 * @overview: This class takes care of the base of a config file for Routes. All other config files for routes should extend
 * this class.
 * 
 * @link https://hackernoon.com/object-oriented-routing-in-nodejs-and-express-71cb1baed9f0 - reference for Router class
 */

'use strict'

import passport from 'passport'

export default class Route {
    // Constructor takes:
    // - path which is the base path for each service exposed by the router subclass (ie. '/api/inventory')
    // - app which is the Express application ref
    constructor(path, app, router) {
        if (!app) {
            throw new Error('The app is missing')
        }
        this.path = path
        this.router = router
        this.app = app
        this.passport = passport
        this.registerRoute()
    }

    // Register the route path with the express router
    registerRoute() {
        this.app.use(this.path, this.router)
    }

    // Method to create a route, it takes:
    // - type which is the type of http request (e.g. 'get', 'post')
    // - path which is the path the request is related to (e.g. '/<route>/login')
    // - callback which is the callback function a router receives (e.g. (req, res) => {})
    // - passport which is a boolean to include Passport authentication for the route
    createRoute(type, path, callback, passport = false) {
        passport ? this.router[type](path, this.passport.authenticate('jwt', { session: false }), callback) : this.router[type](path, callback)
    }
}
