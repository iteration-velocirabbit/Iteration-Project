const db = require('../models/goalAppModels');
const goalsController = {};

goalsController.getAllGoals = async (req, res, next) => {
  try {
    const result  = await db.query(`SELECT * FROM goals;`);
    // console.log('result:', result.rows)
    res.locals.goals = result.rows;
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.getAllGoals: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getAllGoals: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
};

goalsController.getUserGoals = async (req, res, next) => {
  // const endpoint = `http://localhost:3000/fetchgoal/${user}`

  try {
    let queryText;
    //console.log('get goals id: ', req.query.id);
    //console.log('id: is', id);
    if (req.query.google) {
      queryText = `SELECT goals.goal_id, goals.sar, goals.goal_amount, goals.goal_duration, goals.created_at, goals.updated_at, goals.google_id AS goals_updated, progress.progress, progress.updated_at AS progress_updated 
  FROM goals
  JOIN progress ON progress.goal_id = goals.goal_id
  JOIN googleusers ON googleusers.id = goals.google_id
  WHERE goals.google_id = $1`;
    } else {
      queryText = `SELECT goals.goal_id, goals.sar, goals.goal_amount, goals.goal_duration, goals.created_at, goals.updated_at AS goals_updated, progress.progress, progress.updated_at AS progress_updated
    FROM goals
    JOIN progress ON progress.goal_id = goals.goal_id
    JOIN users ON users.id = goals.user_id
    WHERE users.id = $1`;
    }

    //   const queryText2 = `SELECT goals.goal_id, goals.sar, goals.goal_amount, goals.goal_duration, goals.created_at, goals.updated_at AS goals_updated, progress.progress, progress.updated_at AS progress_updated
    // FROM goals
    // JOIN progress ON progress.goal_id = goals.goal_id
    // JOIN users ON google_id = goals.user_id
    // WHERE users.id = $1`;

    const result = await db.query(queryText, [req.query.id]);
    res.locals.userGoal = result.rows;
    // console.log('user goals:', result.rows)

    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.getUserGoals: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.getUserGoals: ERROR: Failed to retrieve goals',
      },
    };
    return next(errorObj);
  }
};

goalsController.createGoal = async (req, res, next) => {
  const { goalName, goalAmount, goalDuration, userId, google } = req.body;
  let queryText;
  //console.log('passed userid', req.body);
  if (google) {
    queryText = `INSERT INTO goals (sar, goal_amount, goal_duration, google_id) VALUES ($1,$2,$3,$4) RETURNING goal_id;`;
  } else {
    queryText = `INSERT INTO goals (sar, goal_amount, goal_duration, user_id) VALUES ($1,$2,$3,$4) RETURNING goal_id;`;
  }
  try {
    const result = await db.query(queryText, [
      goalName,
      goalAmount,
      goalDuration,
      userId,
    ]);
    const goalId = result.rows[0].goal_id;
    // console.log('controller id', goalId);
    const progressText =
      'INSERT INTO progress (goal_id, progress, updated_at, created_at) VALUES ($1,$2,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP) RETURNING progress_id;';
    const progressResult = await db.query(progressText, [goalId, 0]);
    res.locals.newGoal = result.rows;
    // console.log('create goal:',result)
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.createGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.createGoal: ERROR: Failed to create goal',
      },
    };
    return next(errorObj);
  }
};

goalsController.deleteGoal = async (req, res, next) => {
  const id = req.query.id;
  const deleteProgressText = `DELETE FROM progress WHERE goal_id = $1 RETURNING *;`;
  const queryText = `DELETE FROM goals WHERE goal_id = $1 RETURNING *;`;

  try {
    const newResult = await db.query(deleteProgressText, [id]);
    const result = await db.query(queryText, [id]);

    if (result.rowCount === 0) {
      // If no rows were affected, goal was not found
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.locals.delete = result.rows;
    //console.log('delete goals:', result.rows);
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.deleteGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.deleteGoal: ERROR: Failed to delete goal',
      },
    };
    return next(errorObj);
  }
};
goalsController.updateGoal = async (req, res, next) => {
  const id = req.query.id;
  const { goalName, goalAmount, goalDuration } = req.body;
  const queryText = `
  UPDATE goals
  SET sar = $1, goal_amount = $2, target_completion_date = $3
  WHERE goal_id = $4 RETURNING *;`;
  try {
    const result = await db.query(queryText, [
      goalName,
      goalAmount,
      goalDuration,
      id,
    ]);
    if (result.rowCount === 0) {
      // If no rows were affected, goal was not found
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.locals.update = result.rows;
    //console.log('update goals:', result.rows);
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.updateGoal: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.updateGoal: ERROR: Failed to update goal',
      },
    };
    return next(errorObj);
  }
};

goalsController.updateProgress = async (req, res, next) => {
  // const { id: userId } = req.body.userInfo;
  const { progress, goalId } = req.body;
  const queryText = `
  INSERT INTO progress (progress, goal_id, updated_at) VALUES ($1,$2,CURRENT_TIMESTAMP) RETURNING *;
  `;
  try {
    const result = await db.query(queryText, [progress, goalId]);
    res.locals.progressUpdate = result.rows;
    //console.log('progress update data:', result.rows);
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.updateProgress: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.updateProgress: ERROR: Failed to update progress',
      },
    };
    return next(errorObj);
  }
};

goalsController.fetchProgress = async (req, res, next) => {
  try {
    const goalId = req.query.graphId;
    console.log(goalId);
    const queryText = `SELECT * FROM progress WHERE goal_id = $1`;
    const result = await db.query(queryText, [goalId]);
    console.log('fetch progress result', result.rows);
    res.locals.fetchedProgress = result.rows;
    console.log('fetched progress', res.locals.fetchedProgress);
    return next();
  } catch (err) {
    const errorObj = {
      log: `goalsController.fetchProgress: ERRORS: ${err.message}`,
      message: {
        err: 'goalsController.fetchProgress: ERROR: Failed to fetch progress',
      },
    };
    return next(errorObj);
  }
};

module.exports = goalsController;
