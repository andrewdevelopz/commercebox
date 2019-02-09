/**
 * @overview: This class is the route for the inventory section of the api and takes care of all the business logic.
 */

'use strict'

// Dependencies
import express from 'express'
import Route from '../Route'

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
        this.createRoute('post', '/createProducts', (req, res) => {
            // set products && user from req.body
            const products = req.body.products
            const user = req.user

            // set user id in product object
            if (products.length > 1) {
                for (const product of products) {
                    product['userId'] = user._id
                }
            } else {
                products[0]['userId'] = user._id
            }

            // send back results
            res.json(products)
        }, passport)
    }
}