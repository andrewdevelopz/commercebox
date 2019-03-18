/**
 * @overview: This class is the route for the inventory section of the api and takes care of all the business logic.
 */

// Dependencies
import express from 'express'
import Route from '../Route'
import Product from '../../models/Product'

const router = express.Router()

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
        this.root(true)
        this.createProducts(true)
        this.getInventory(true)
    }

    /**
     * All methods take:
     * @param passport - which is a boolean value to include passport auth or not
     */

    root(passport) {
        this.createRoute('get', '/', (req, res) => {
            res.send('Hello from <b>ROOT</b> path of inventory')
        }, passport)
    }

    // Create products
    createProducts(passport) {
        this.createRoute('post', '/createProducts', async (req, res) => {
            try {
                // set products && user from req
                const products = req.body.products
                const user = req.user

                // if there is only one product to query
                if (products.length === 1) {
                    // set user id in product object
                    products[0]['userID'] = user._id

                    const query = new Product(products[0])
                    await query.save()
                } else {
                    // loop through all products to set userID
                    for (const product of products) {
                        // set user id in product object
                        product['userID'] = user._id
                    }

                    // Insert products into database
                    await Product.insertMany(products)
                }

                // send back results
                res.json({
                    success: true,
                    products: products
                })
            } catch (e) {
                // send error results
                res.json({
                    success: false,
                    error: e
                })
            }
        }, passport)
    }

    // Get inventory
    getInventory(passport) {
        this.createRoute('get', '/getInventory', async (req, res) => {
            // get all products from database
            const products = await Product.find()
            res.json(products)
        }, passport)
    }
}