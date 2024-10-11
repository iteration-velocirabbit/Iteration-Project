const express = require('express');
const router = express.Router();
const app = require('../server.js');
const goalsController = require('../controllers/goalsController.js');

router.get('/', goalsController.getAllData, (req, res) => {
    res.status(200).json(res.locals.test)
})

module.exports = router;