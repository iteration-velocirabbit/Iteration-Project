const db = require('../models/goalAppModels')
const goalsController = {}



goalsController.getAllData = async(req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM user`);
        console.log('result:', result.rows[0])
        res.locals.test = result.rows[0];
        return next()
    } catch (err) {
    const errorObj = {
      log: `goalsController.getAllData: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getAllData: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
}

module.exports = goalsController;