/**
 * @overview: This class is the route for the shipping section of the api and takes care of all the business logic.
 */

// Dependencies
import express from 'express';
const router = express.Router();
import Route from '../Route';

export default class Shipping extends Route {
    constructor(path: string, app: express.Application) {
        // Super takes:
        // - path which is received from when instantiating the class
        // - app which is received from when instantiating the class
        // - router which is received from the dependencies from above
        super(path, app, router);
        // Run all the methods to each path of the route
        this.run();
    }

    run(): void {
        this.root();
        this.test();
    }

    root(): void {
        this.createRoute('get', '/', (req: express.Request, res: express.Response) => {
            res.send('Hello from <b>ROOT</b> path of shipping');
        });
    }

    test(): void {
        this.createRoute('get', '/test', (req: express.Request, res: express.Response) => {
            res.send('Hello from <b>TEST</b> path of shipping');
        });
    }
}
