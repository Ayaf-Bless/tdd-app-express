const request = require("supertest");
const app = require("../app.js");

it("returns 200 when signup is valid", () => {
  request(app)
    .post("api/v1/users")
    .send({
      username: "user1",
      email: "email@gmail.com",
      password: "1122",
    })
    .expect(200);
});
