/**
 * @overview: This class is the route for the orders section of the api and takes care of all the business logic.
 */

// Dependencies
import express from 'express';
import Route from '../Route';
import Order from '../../models/Order';
import { getAllOrders } from '../../utils/woocommerce/wooTools';
import {
    IRequestExtended,
    WoocommerceTokens
} from 'definitions';

const router = express.Router();

export default class Orders extends Route {
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
        this.test(true);
        this.getAllOrders(true);
    }

    root(): void {
        this.createRoute('get', '/', (req: IRequestExtended, res: express.Response) => {
            res.send('Hello from <b>ROOT</b> path of orders');
        });
    }

    test(passport: boolean): void {
        this.createRoute('get', '/test', (req: IRequestExtended, res: express.Response) => {
            res.json({ test: 'Hello from <b>TEST</b> path of orders' });
        }, passport);
    }

    /**
     * Get all orders from the woocommerce store
     */
    getAllOrders(passport: boolean): void {
        this.createRoute('get', '/getAllOrders', (req: IRequestExtended, res: express.Response) => {
            if (req.user && req.user.tokens && req.user.tokens.woocommerce) {
                const tokens: WoocommerceTokens = req.user.tokens.woocommerce;
                console.log(tokens);
                res.json({ test: 'testing' });
            }
        }, passport);
    }
}
