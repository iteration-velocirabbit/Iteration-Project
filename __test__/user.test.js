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

    it('GET all users from the database', () => {

    })

});
});