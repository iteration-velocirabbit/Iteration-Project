const db = require('../models/goalAppModels')
const goalsController = {}



goalsController.getAllGoals = async(req, res, next) => {
    try {
        const result = await db.query(`SELECT * FROM goals;`);
        console.log('result:', result.rows)
        res.locals.goals = result.rows;
        return next()
    } catch (err) {
    const errorObj = {
      log: `goalsController.getAllGoals: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getAllGoals: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
}

goalsController.getUserGoals = async(req, res, next) => {
  // const endpoint = `http://localhost:3000/fetchgoal/${user}`
  
  try {
  const id = req.query.id
  console.log('id:',id)
    const queryText = `SELECT goals.sar, goals.measurable, goals.target_completion_date, goals.created_at, goals.updated_at AS goals_updated, progress.progress, progress.updated_at AS progress_updated
  FROM goals
  JOIN progress ON progress.goal_id = goals.goal_id
  JOIN users ON users.user_id = goals.user_id
  WHERE users.user_id = $1`;
  const result = await db.query(queryText,[id])
  res.locals.userGoal = result.rows
    console.log('user goals:', result.rows)

    return next()
  } catch (err) {
    const errorObj = {
      log: `goalsController.getUserGoals: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getUserGoals: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
}

module.exports = goalsController;