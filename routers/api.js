const express = require('express');
const router = express.Router();
const app = require('./server.js');

router.get('/', goalsController.getAllData, (req, res) => {
    res.status(200).json(res.locals.test)
})

module.exports = router;