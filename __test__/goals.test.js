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