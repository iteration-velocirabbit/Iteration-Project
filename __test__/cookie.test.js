const cookieController = require('../server/controllers/cookieController');
// const app = require('./../server/server')
// const request = require('supertest')(app);
// const expect = require('chai').expect;

describe('cookieController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};  // Mocked request object
        res = {
            cookie: jest.fn()  // Mocked cookie method
        };
        next = jest.fn();  // Mocked next function
    });

    describe('setCookie', () => {
        it('should set a cookie with the correct parameters', () => {
            // Setup res.locals for the test case
            res.locals = {
                session: {
                    rows: [{ cookie_id: 'testCookieId' }]
                }
            };

            cookieController.setCookie(req, res, next);

            // Assert that res.cookie was called with the expected values
            expect(res.cookie).toHaveBeenCalledWith(
                'Vasean&Sung', // 1 st 
                'testCookieId', // 2nd cookie
                {
                    httpOnly: true,
                    secure: false,
                    max: 60 * 60 * 1000,
                    path: '/'
                }
            );
            expect(next).toHaveBeenCalled();
        });
        // it(`Header has cookie name of "Vasean&Sung"`,(done) =>{
        //     request
        //         .expect('set-cookie', /Vasean&Sung=/, done);
        // })
    });

});