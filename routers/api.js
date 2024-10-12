const express = require('express');
const router = express.Router();
const app = require('../server.js');
const goalsController = require('../controllers/goalsController.js');
const userController = require('../controllers/userController.js');

// fetching goals after login
router.get('/', goalsController.getAllGoals, (req, res) => {
    res.status(200).json(res.locals.goals);
})

// for login and querying users table in DB
router.get('/users', userController.getAllUsers, (req, res) => {
    res.status(200).json(res.locals.users);
})

// for logging in (POST request)
router.post('/login', userController.login, (req, res) => {
    res.status(200).json({ success:true, loggedInUser: res.locals.login });
})

router.get('/fetchgoal', goalsController.getUserGoals, (req, res) => {
    res.status(200).json(res.locals.userGoal);
})

module.exports = router;