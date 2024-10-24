const db = require('../models/goalAppModels');

const sessionController ={};


sessionController.startSession = async(req,res,next)=>{

try{
const{username, id} = res.locals.login;
let queryText = 'SELECT * FROM sessions WHERE cookie_id = $1';


let results = await db.query(queryText, [username])
//console.log( 'RESULTS:', results)
if(results.rows.length===0){
let insertText = 'INSERT into sessions (cookie_id, user_id) VALUES($1, $2) RETURNING *';

const newSession = await db.query(insertText, [username, id]);
console.log('new session', newSession.rows[0])
}
else{
    const existingSession = results.rows[0];
    console.log('current session', existingSession.rows[0]);
}

return next();
}catch (err){
    const errorObj = {
        log: `sessionController.startSession: ERRORS: ${err.message}`,
        message: {
          err: 'sessionController.startSession: ERROR: Failed to start session',
        },
      };
    return next(errorObj);
}

}

module.exports = sessionController;