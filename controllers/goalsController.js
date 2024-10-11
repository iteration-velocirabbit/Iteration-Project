const db = require('../models/goalAppModels')
const goalsController = {}



goalsController.getAllData = async(req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM users`);
        console.log('result:', result)
        res.locals.test = result
        return next()
    } catch (err) {
    const errorObj = {
      log: `goalsControllet.getAllData: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getAllData: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
}