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
goalsController.createGoal = async (req, res, next) => {
  const { goalName, goalAmount, goalDuration } = req.body
  const queryText = `INSERT INTO goals (sar, measurable, target_completion_date) VALUES ($1,$2,$3) RETURNING goal_id`
  
  try {
    const result = await db.query(queryText, [goalName, goalAmount, goalDuration])
    res.locals.newGoal = result.rows
    console.log('create goal:',result)
    return next()
  }
  catch (err) {
    const errorObj = {
      log: `goalsController.createGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.createGoal: ERROR: Failed to create goal',
      },
    };
    return next(errorObj);
  }
}

goalsController.deleteGoal = async (req, res, next) => {

  const goalId = req.body.goalId
  const queryText = `DELETE FROM goals WHERE goal_id = $1 RETURNING *;`
  try {
    const result = await db.query(queryText, [goalId])
    if (result.rowCount === 0) {
      // If no rows were affected, goal was not found
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.locals.delete = result.rows
    console.log('delete goals:', result.rows)
    return next()
  } catch (err) {
    const errorObj = {
      log: `goalsController.deleteGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.deleteGoal: ERROR: Failed to create goal',
      },
    };
    return next(errorObj);
  }
}
goalsController.updateGoal = async (req, res, next) => {
  const { goalName, goalAmount, goalDuration, goalId } = req.body;
  const queryText = `
  UPDATE goals
  SET sar = $1, measurable = $2, target_completion_date = $3
  WHERE goal_id = $4 RETURNING *;`;
  try {
    const result = await db.query(queryText, [
      goalName,
      goalAmount,
      goalDuration,
      goalId,
    ]);
      if (result.rowCount === 0) {
        // If no rows were affected, goal was not found
        return res.status(404).json({ message: 'Goal not found' });
      }
    res.locals.update = result.rows;
    console.log('update goals:', result.rows);
    return next()
  } catch (err) {
    const errorObj = {
      log: `goalsController.updateGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.updateGoal: ERROR: Failed to create goal',
      },
    };
    return next(errorObj);
  }
}
module.exports = goalsController;