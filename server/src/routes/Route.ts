/**
 * @overview: This class takes care of the base for all Route files. All other route files should extend this class.
 * 
 * @link https://hackernoon.com/object-oriented-routing-in-nodejs-and-express-71cb1baed9f0 - reference for Router class
 */

import passport from 'passport';
import { Application, Router } from 'express';
import { IRouterExtended } from 'definitions';

export default class Route {
    path: string;
    router: IRouterExtended;
    app: Application;
    passport: passport.PassportStatic;

    // Constructor takes:
    // - path which is the base path for each service exposed by the router subclass (ie. '/api/inventory')
    // - app which is the Express application ref
    // - router which is the express.Router being passed in from the sub-class
    constructor(path: string, app: Application, router: Router) {
        if (!app) {
            throw new Error('The app is missing');
        }
        this.path = path;
        this.router = router;
        this.app = app;
        this.passport = passport;
        this.registerRoute();
    }

    // Register the route path with the express router
    registerRoute(): void {
        this.app.use(this.path, this.router);
    }

    // Method to create a route, it takes:
    // - type which is the type of http request (e.g. 'get', 'post')
    // - path which is the path the request is related to (e.g. '/<route>/login')
    // - callback which is the callback function a router receives (e.g. (req, res) => {})
    // - passport which is a boolean value to whether include Passport authentication for the route
    createRoute(type: string, path: string, callback: Function, passport: boolean = false): void {
        passport ? this.router[type](path, this.passport.authenticate('jwt', { session: false }), callback) : this.router[type](path, callback);
    }
}
