/**
 * @overview: This class is the route for the inventory section of the api and takes care of all the business logic.
 */

// Dependencies
import express from 'express';
import Route from '../Route';
import Product from '../../models/Product';
import dummy from '../../.data/dummy/products';
import { getAllProducts } from '../../utils/woocommerce/wooTools';
import {
    IRequestExtended,
    IProduct,
    QueryStatus,
    TUser,
    TProduct,
    WoocommerceTokens
} from 'definitions';

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
        this.generateDummyData(true);
        this.getInventory(true);
        this.createInventory(true);
        this.updateInventory(true);
        this.deleteInventory(true);
        this.getWooProducts(true);
    }

    /**
     * All methods take:
     * @param passport - which is a boolean value to include passport auth or not
     */
    root(passport: boolean): void {
        this.createRoute('get', '/', (req: IRequestExtended, res: express.Response) => {
            res.send('Hello from <b>ROOT</b> path of inventory');
        }, passport);
    }

    // Generate dummy data
    generateDummyData(passport: boolean): void {
        this.createRoute('get', '/generateDummyData', async (req: IRequestExtended, res: express.Response) => {
            if (req.user) {
                const products: any = dummy;
                const userID: TUser = req.user._id;

                for (const product of products) {
                    product['userID'] = userID;
                }

                await Product.insertMany(products);

                res.status(200).json({
                    message: `${products.length} Dummy data has been generated`
                });
            }
        }, passport);
    }

    // Get inventory
    getInventory(passport: boolean): void {
        this.createRoute('get', '/getInventory', async (req: IRequestExtended, res: express.Response) => {
            if (req.user) {
                // get all products from database
                const products = await Product.find({ userID: req.user._id });
                console.log(req.user);
                res.status(200).json(products);
            }
        }, passport);
    }

    // Create products
    createInventory(passport: boolean): void {
        this.createRoute('post', '/createInventory', async (req: IRequestExtended, res: express.Response) => {
            try {
                // set products && user from req
                const products: TProduct[] = req.body.products;
                const user: TUser = req.user;

                let updated: number = 0;
                // if there is only one product to query
                if (products.length === 1) {
                    // set user id in product object
                    products[0]['userID'] = user._id;

                    const query: IProduct = new Product(products[0]);
                    await query.save();
                    updated++
                } else {
                    // loop through all products to set userID
                    for (const product of products) {
                        // set user id in product object
                        product['userID'] = user._id;
                    }

                    // Insert products into database
                    const inserted = await Product.insertMany(products);
                    updated += inserted.length;
                }

                // send back results
                res.status(201).json({
                    message: `${updated} product(s) have been created`
                });
            } catch (e) {
                // send error results
                res.status(500).json({
                    error: e.message
                });
            }
        }, passport);
    }

    // Update inventory
    /** @todo - use bulkWrite() to update the products */
    updateInventory(passport: boolean): void {
        this.createRoute('put', '/updateInventory', async (req: IRequestExtended, res: express.Response) => {
            try {
                const items: TProduct[] = req.body.items;
                // delete `changed` property before updating database
                for (let i = 0, n = items.length; i < n; i++) {
                    delete items[i].changed;
                }

                // keep track of documents updated
                let updated: number = 0;
                // update all the products in `items[]`
                for (const item of items) {
                    const update: QueryStatus = await Product.updateOne({ _id: item._id }, item);
                    updated += update.n!;
                }

                /** @todo trying to update all documents with a one liner */
                // const updated: QueryStatus = await Product.updateMany({ _id: { $in: items } }, items);

                res.status(200).json({ message: `${updated} document(s) updated successfully` });
            } catch (e) {
                console.log(e);
                res.status(500).json({ error: e.message });
            }
        }, passport);
    }

    // Delete inventory
    deleteInventory(passport: boolean): void {
        this.createRoute('delete', '/deleteInventory', async (req: IRequestExtended, res: express.Response) => {
            try {
                const items: TProduct[] = req.body.items;

                // delete all the products in `items`
                const deleted: QueryStatus = await Product.deleteMany({ _id: { $in: items } });

                res.status(202).json({ message: `${deleted.n} document(s) deleted successfully` });
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    error: e.message
                });
            }
        }, passport);
    }

    // Get woocommerce products
    getWooProducts(passport: boolean): void {
        this.createRoute('get', '/getWooProducts', async (req: IRequestExtended, res: express.Response) => {
            try {
                if (req.user && req.user.tokens && req.user.tokens.woocommerce) {
                    // declare users woocommerce `tokens` and pass it to getAllProducts(tokens);
                    const tokens: WoocommerceTokens = req.user.tokens.woocommerce;
                    const products = await getAllProducts(tokens);
                    res.status(200).json({
                        success: true,
                        body: products
                    });
                }
            } catch (e) {
                console.log(e);
                res.status(500).json({
                    success: false,
                    error: e.message
                });
            }
        }, passport);
    }
}
