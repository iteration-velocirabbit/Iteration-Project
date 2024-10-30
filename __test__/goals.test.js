const db = require("../server/models/goalAppModels");
const goalsController = require("../server/controllers/goalsController");
const app = require("./../server/server");
const request = require("supertest")(app);

jest.mock("../server/models/goalAppModels");

describe("goalsController", () => {
 
    describe("Get All Goals", () => {
    let req, res, next;

    beforeEach(() => {
      req = {};
      res = { locals: {} };
      next = jest.fn();
    });

    it("POST request to create a goal to database", (done) => {
       const reqBody = { goalName:"test", goalAmount: 10, goalDuration: 10, userId: 1  }
      request
        .post("/creategoal")
        .send(reqBody)
        .end(async (err, goal) => {
            const queryText = `INSERT INTO goals (sar, measurable, target_completion_date, user_id, created_at) VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP) RETURNING goal_id;`;
            const result = await db.query(queryText, [
                reqBody.goalName,
                reqBody.goalAmount,
                reqBody.goalDuration,
                reqBody.userId,
              ])
            expect(err).toBe(null);
            expect(goal).toBeTruthy();
            done();
          });

        });

        it('POST request with incorrectly formatted body an error message', (done) => {
            const reqBody = { goalName:"test", goalAmount: "test", goalDuration: "10", userId: "1"    }
            request
              .post('/creategoal')
              .send({reqBody})
              .end((err, res) => {
                // console.log('text',res.text);
                // expect(reqBody).toThrow();
                expect(res.reqBody).toBeUndefined();
                done();
              });
          });

        it('PUT request to update the goals in database', (done) => {
            const reqBody = { goalNAme: 'test', goalAmount: 3, goalDuration: 2, userId: '1'}
            const queryText = `UPDATE goals SET sar = $1, measurable = $2, target_completion_date = $3 WHERE goal_id = $4 RETURNING *;`;
            const result = db.query(queryText, [
                reqBody.goalName,
                reqBody.goalAmount,
                reqBody.goalDuration,
              ])
            request
              .put('/updategoal')
              .send(reqBody)
              .end((err, res) => {
                expect(res.reqBody).toBe(result);
                done();
              })
              
        })
        xit('Update the progress in database', (done) => {
            const reqBody = { progress: 1, goalId : 1 }
            const queryText = `INSERT INTO progress (progress, goal_id, updated_at) VALUES ($1,$2,CURRENT_TIMESTAMP) RETURNING *;`;
            const result = db.query(queryText, [reqBody.progress, reqBody.goalId])
            console.log('result',result);
            request
                .post('/updateprogress')
                .send(reqBody)
                .end((err, res) => {
                    expect()
                    done();
                })


        })
        xit('Fetch all of progress from database', (done) => {
            const goalId = { id: 1 };
            const queryText = `SELECT * FROM progress WHERE goal_id = $1`;
            const result = db.query(queryText, [goalId]);
            console.log('progress',result);
            res.locals.fetchedProgress = result.rows;
            request
                .get('/fetchprogress')
                .send(goalId)
                .end((err, res) => {
                    expect(res.locals).toBe(result.rows);
                    done();
                })
        })
    });
  });
=======
const db = require ('../server/models/goalAppModels');
const goalsController = require('../server/controllers/goalsController');
const app = require('./../server/server');
const request = require('supertest')(app);

jest.mock('../server/models/goalAppModels');

describe('goalsController', () => {
    
    describe('Get All Goals', () => {
        let req, res, next;

        beforeEach(()=> {
            req = {};
            res = { locals: {} };
            next = jest.fn();
        });
        
        it('GET request to database to get all the goals information', async () => {
            const allGoals = [{id: 1, sar:'1'}, {id:2,sar:'2'}, {id: 3, sar: '3'}]
            db.query.mockResolvedValueOnce({ rows: allGoals});

            await goalsController.getAllGoals(req, res, next);

            expect(res.locals.goals).toEqual(allGoals);

            expect(next).toHaveBeenCalled();
                
        }
        )
    })



})

