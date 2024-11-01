const db = require('../models/goalAppModels');
const userController = {};

userController.getAllUsers = async (req, res, next) => {
  // console.log('redirect successful');
  try {
    const result = await db.query(`SELECT * FROM users;`);
    // console.log('result:', result.rows);
    res.locals.users = result.rows;
    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.getAllUsers: ERRORS: ${err.message}`,
      message: {
        err: 'userController.getAllUsers: ERROR: Failed to retrieve characters',
      },
    };
    return next(errorObj);
  }
};
userController.loginGoogle = async (req, res, next) => {
  const {
    id: googleId,
    email: googleEmail,
    verified_email: verifiedEmail,
    name: name,
    given_name: givenName,
    family_name: familyName,
  } = req.body.userInfo;
  try {
    const queryText = 'SELECT * FROM googleusers WHERE google_email = $1';
    const results = await db.query(queryText, [googleEmail]);

    if (results.rows.length === 0) {
      const insertText =
        'INSERT INTO googleusers (google_id, google_email, verified_email, name, given_name, family_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const insertResults = await db.query(insertText, [
        googleId,
        googleEmail,
        verifiedEmail,
        name,
        givenName,
        familyName,
      ]);
      res.locals.googleLogin = insertResults.rows[0];
    } else {
      const existingUser = results.rows[0];
      res.locals.googleLogin = existingUser;
      req.session.userId = existingUser;
    }
    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.googleLogin: ERRORS: ${err.message}`,
      message: {
        err: 'userController.googleLogin: ERROR: Failed to login',
      },
    };
    return next(errorObj);
  }
  return next();
};
userController.login = async (req, res, next) => {
  const { username: username, password: password } = req.body.userInfo;

  //console.log(req.body);
  const queryText = `SELECT * FROM users WHERE username = $1`;

  try {
    //finds user within the database
    const results = await db.query(queryText, [username]);
    //sets the existing user to the query value
    if (results.rows.length === 0) {
      res.locals.loginSuccess = false;
      //console.log('You must create an account');
      return next();
    } else {
      res.locals.loginSuccess = true;
      const existingUser = results.rows[0];
      res.locals.login = existingUser;
      req.session.userId = existingUser.username;
    }

    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.login: ERRORS: ${err.message}`,
      message: {
        err: 'userController.login: ERROR: Failed to login',
      },
    };
    return next(errorObj);
  }
};

userController.createUser = async (req, res, next) => {
  let existingUser = false;

  const { username: username, password: password } = req.body.userInfo;
  const queryText = `SELECT * FROM users WHERE username = $1`;
  try {
    const results = await db.query(queryText, [username]);
    if (results.rows.length === 0) {
      const insertText =
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const insertResults = await db.query(insertText, [username, password]);

      //console.log('Inserted REsults', insertResults.rows[0]);
      res.locals.login = insertResults.rows[0];
    } else {
      existingUser = true;
      //console.log("Inserted Results",results.rows[0]);

      //  res.locals.login = results.rows[0];
      //console.log('User already Exists');

      res.locals.existingUser = existingUser;
    }
    return next();
  } catch (err) {
    const errorObj = {
      log: `userController.createUser: ERRORS: ${err.message}`,
      message: {
        err: 'userController.createUSer: ERROR: Failed to signup',
      },
    };
    return next(errorObj);
  }
};

module.exports = userController;
