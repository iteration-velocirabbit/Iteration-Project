const db = require('../models/goalAppModels')
const userController = {}

userController.getAllUsers = async(req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM users;`);
        console.log('result:', result.rows)
        res.locals.users = result.rows;
        return next()
    } catch (err) {
        const errorObj = {
            log: `userController.getAllUsers: ERRORS: ${err.message}`,
            message: {
                err: 'userController.getAllUsers: ERROR: Failed to retrieve characters',
            },
        };
        return next(errorObj);
    }
}

userController.login = async(req, res, next) => {
    const { username, password } = req.body;
    const queryText = `SELECT * FROM users WHERE username = $1;`;

    try {
        const results = await db.query(queryText, [username])
        if (results.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'user not found' })
        }
        const user = results.rows[0];
        if (password === user.password) {
            res.locals.login = { id: user.user_id, username: user.username }
        }
        
        console.log(user);
        return next();
    }
    catch (err) {
        const errorObj = {
            log: `userController.login: ERRORS: ${err.message}`,
            message: {
                err: 'userController.login: ERROR: Failed to login',
            },
        };
        return next(errorObj);
    }
}

// userController.signUp = async(req, res, next) => {
//     const { username, password, email } = req.body;
    
// }

module.exports = userController

