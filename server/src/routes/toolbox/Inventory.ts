/**
 * @overview: This class is the route for the inventory section of the api and takes care of all the business logic.
 */

// Dependencies
import express from 'express';
import Route from '../Route';
import Product from '../../models/Product';

// Import types
import { IProduct, QueryStatus } from 'mongooseTypes';

const router = express.Router();

export default class Inventory extends Route {
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
        this.root(true);
        this.getInventory(true);
        // this.createProducts(true);
        this.updateInventory(true);
        this.deleteInventory(true);
    }

    /**
     * All methods take:
     * @param passport - which is a boolean value to include passport auth or not
     */

    root(passport: boolean): void {
        this.createRoute('get', '/', (req: express.Request, res: express.Response) => {
            res.send('Hello from <b>ROOT</b> path of inventory');
        }, passport);
    }

    // Get inventory
    getInventory(passport: boolean): void {
        this.createRoute('get', '/getInventory', async (req: express.Request, res: express.Response) => {
            // get all products from database
            const products = await Product.find();
            res.json(products);
        }, passport);
    }

    // Create products
    createInventory(passport: boolean): void {
        this.createRoute('post', '/createInventory', async (req: express.Request, res: express.Response) => {
            try {
                // set products && user from req
                const products: Product[] = req.body.products;
                const user: User = req.user;

                // if there is only one product to query
                if (products.length === 1) {
                    // set user id in product object
                    products[0]['userID'] = user._id;

                    const query: IProduct = new Product(products[0]);
                    await query.save();
                } else {
                    // loop through all products to set userID
                    for (const product of products) {
                        // set user id in product object
                        product['userID'] = user._id;
                    }

                    // Insert products into database
                    await Product.insertMany(products);
                }

                // send back results
                res.json({
                    success: true,
                    products: products
                });
            } catch (e) {
                // send error results
                res.json({
                    success: false,
                    error: e
                });
            }
        }, passport);
    }

    // Update inventory
    updateInventory(passport: boolean): void {
        this.createRoute('put', '/updateInventory', async (req: express.Request, res: express.Response) => {
            try {
                const items: Product[] = req.body.items;
                // delete `changed` property before updating database
                for (let i = 0, n = items.length; i < n; i++) {
                    delete items[i].changed;
                }
                console.log(items);

                // update all the products in `items`
                const update: QueryStatus = await Product.updateMany({ _id: { $in: items } }, { $set: items });

                res.json({ success: true, message: `${update.n} document(s) updated successfully` });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }, passport);
    }

    // Delete inventory
    deleteInventory(passport: boolean): void {
        this.createRoute('put', '/deleteInventory', async (req: express.Request, res: express.Response) => {
            try {
                const items: Product[] = req.body.items;

                // delete all the products in `items`
                const deleted: QueryStatus = await Product.deleteMany({ _id: { $in: items } });

                res.json({ success: true, message: `${deleted.n} document(s) deleted successfully` });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }
        }, passport);
    }
}
