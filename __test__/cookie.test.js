const cookieController = require('../server/controllers/cookieController');

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
                'Vasean&Sung',
                'testCookieId',
                {
                    httpOnly: true,
                    secure: false,
                    max: 60 * 60 * 1000,
                    path: '/'
                }
            );
            expect(next).toHaveBeenCalled();
        });
    });
});