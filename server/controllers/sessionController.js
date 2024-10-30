const db = require("../models/goalAppModels");

const sessionController = {};

sessionController.startSession = async (req, res, next) => {
  try {
    if(res.locals.login){
    const { id } = res.locals.login;
    

    let queryText = "SELECT * FROM sessions WHERE cookie_id = $1";
    let cookieId = Math.floor(Math.random()*100000000000000);

      let results = await db.query(queryText, [id]);
      if (results.rows.length === 0) {
        let insertText =
          "INSERT into sessions (cookie_id, user_id) VALUES($1, $2) RETURNING *";
  
        const newSession = await db.query(insertText, [cookieId, id]);
        console.log("new session", newSession.rows[0]);
  
        res.locals.session = newSession;
      } else {
        // if there's existing cookie in the database,
        const existingSession = results;
        res.locals.session = existingSession;
        // sessionStorage.setItem(results);
        console.log("current session", existingSession.rows[0]);
      }

    }

    return next();
  } catch (err) {
    const errorObj = {
      log: `sessionController.startSession: ERRORS: ${err.message}`,
      message: {
        err: "sessionController.startSession: ERROR: Failed to start session",
      },
    };
    return next(errorObj);
  }
};

module.exports = sessionController;
