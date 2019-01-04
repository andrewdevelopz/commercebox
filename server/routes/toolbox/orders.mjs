'use strict'

// Dependencies
import express from 'express'

const router = express.Router();

router.get('/', (req, res) => {
    res.send({test: 'Route to orders.mjs'})
})

export default router
