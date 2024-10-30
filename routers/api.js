const express = require("express");
const router = express.Router();
const app = require("../server/server.js");
const goalsController = require("../server/controllers/goalsController.js");
const userController = require("../server/controllers/userController.js");
const sessionController = require("../server/controllers/sessionController.js");
const cookieController = require("../server/controllers/cookieController.js");

// fetching goals after login
router.get("/", goalsController.getAllGoals, (req, res) => {
  res.status(200).json(res.locals.goals);
});

// for login and querying users table in DB
router.get("/users", userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

// for logging in (POST request)

router.post(
  "/loginGoogle",
  userController.loginGoogle,
  (req,res)=>{
    res.status(200).json({success:true, loggedInUser: res.locals.googleLogin});
  }
)
router.post(
  "/login",
  userController.login,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    if(res.locals.loginSuccess){
      res.status(200).json({ success: true, loggedInUser: res.locals.login });
    }
    else{
      res.status(200).json({success:false, loggedInUser: null});
    }
  }
);

router.post(
  "/signup",
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    // console.log(res.locals.existingUser);
    if (res.locals.existingUser){
      //window.alert('Already a existing user!')
      res.status(200).json({success:false, loggedInUser:null})
    }
    else{
      res.status(201).json({ success: true, loggedInUser: res.locals.login });
    }
  }
);

// for fetching a specific user's goals (GET)
router.get("/fetchgoal", goalsController.getUserGoals, (req, res) => {
  res.status(200).json(res.locals.userGoal);
});

// for creating a new goal (POST)
router.post("/creategoal", goalsController.createGoal, (req, res) => {
  res.status(200).json(res.locals.newGoal);
});

// delete a goal (DELETE)
router.delete("/deletegoal", goalsController.deleteGoal, (req, res) => {
  res.status(200).json(res.locals.delete);
});

// update a goal (goals data table) (PUT)
router.put("/updategoal", goalsController.updateGoal, (req, res) => {
  res.status(200).json(res.locals.update);
});

// update progress for a goal (progress data table) (POST)
router.post("/updateprogress", goalsController.updateProgress, (req, res) => {
  res.status(200).json(res.locals.progressUpdate);
});

// fetch progress for goal for the Graph component
router.get("/fetchprogress", goalsController.fetchProgress, (req, res) => {
  res.status(200).json(res.locals.fetchedProgress);
});

module.exports = router;
