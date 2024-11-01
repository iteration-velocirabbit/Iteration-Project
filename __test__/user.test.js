const db = require("../server/models/goalAppModels");
const goalsController = require("../server/controllers/goalsController");
const app = require("./../server/server");
const request = require("supertest")(app);
// import axios from 'axios';

jest.mock('axios');

describe("goalsController", () => {
  
    describe("Get All Goals", () => {
      it('GET all users from the database', async () => {

        const userResponse = {
          data: {
            id: "101",
            username: "user1",
            password: "password1"
        }
      }

        // axios.get.mockResolvedValue(userResponse);
        console.log('userResponse',userResponse)
        const users = await db.query(`SELECT * FROM users;`);
        console.log('users', users);
        // expect(axios.get).toHaveBeenCalledWith(1);

        expect(users.rows[0].id).toEqual(userResponse.data.id);
        expect(users.rows[0].username).toEqual(userResponse.data.username);
        expect(users.rows[0].password).toEqual(userResponse.data.password);
    })

    it('GET User goal', () => {

    })
})

});
