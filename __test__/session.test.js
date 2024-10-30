const db = require('../server/models/goalAppModels');
const sessionController = require('../server/controllers/sessionController');
const app = require('./../server/server');
const request = require('supertest')(app);
//const expect = require('chai').expect;
const sinon = require('sinon');



describe('sessionController', ()=>{


    it('Login successully and a session is started', (done)=>{
        const reqBody = {
            username :'123',
            password :'123'
        }
        request
            .post('/login')
            .send(reqBody)
            .end(async (err,res)=>{
                let queryText = "SELECT * FROM sessions WHERE cookie_id = $1";
                let results = await db.query(queryText, [reqBody.username]);
                expect(err).toBe(null);
                expect(results.rows[0]).not.toBe(null);
                done();
            })
    });
    it (`Login failed and a session isn't started`, async () => {
        const reqBody = {
            username: null,
            password: null,
        }
        jest.fn().mockResolvedValueOnce({ rows: []});

        const response = await request
            .post('/login')
            .send(reqBody);

        const queryText = "SELECT * FROM sessions WHERE cookie_id = $1";
        const results = await db.query(queryText, [reqBody.username]);

        expect(response.status).not.toBe(200);

        expect(results.rows.length).toBe(0);
        })
    })




// describe('Sessions', () => {

//     it('Creates a session when a user successfully creates an account', (done) => {
//       request
//         .post('/signup')
//         .type('form')
//         .send({username: 'test2', password: 'password2'})
//         .end((err, res) => {
//           User.findOne({ username: 'test2' }, (err, user) => {
//             Session.findOne({cookieId: user._id}, (err, session) => {
//               expect(err).to.be.null;
//               expect(session).to.exist;
//               done();
//             });
//           });
//         });
//     });