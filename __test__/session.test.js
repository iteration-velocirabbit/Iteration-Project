const db = require('../server/models/goalAppModels');
const sessionController = require('../server/controllers/sessionController');
const app = require('./../server/server');
const request = require('supertest')(app);
//const expect = require('chai').expect;
const sinon = require('sinon');

describe('sessionController', ()=>{


    it('Login successully and a session is started', (done)=>{
        const reqBody = {
            username:'123',
            id:'123'
        }
        request
            .post('/login')
            .send(reqBody)
            .end(async (err,res)=>{
                let queryText = "SELECT * FROM sessions WHERE cookie_id = $1";
                let results = await db.query(queryText, [reqBody.username]);
                expect(err).toBe(null);
                expect(results.rows[0]).toBeDefined();
                done();
            })
    })

    // it(`takes you to the signup page if you don't have an account`,()=>{
    //     const reqBody = {
    //         username:'18749182',
    //         id:'12394617239'
    //     }
    //     request
    //         .post('/login')
    //         .send(reqBody)
    //         .end(async (err,res)=>{
    //             let queryText = "SELECT * FROM sessions WHERE cookie_id = $1";
    //             let results = await db.query(queryText, [reqBody.username]);
    //             expect(err).toBe(null);
    //             expect(results.rows.length===0);
    //             expect(res.headers.location).toEqual('/signup');
    //             done();
    //         })
    // })
    });




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