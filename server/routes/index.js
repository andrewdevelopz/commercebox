'use strict'

// Dependencies
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({test: 'Route to index.js'});
});

module.exports = router;
