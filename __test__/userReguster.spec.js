const request = require("supertest");
const app = require("../app");

it("returns 200 when signup is valid", (done) => {
  request(app)
    .post("/api/1.0/users")
    .send({
      username: "user1",
      email: "email@gmail.com",
      password: "1122",
    })
    .then((res) => {
      expect(res.status).toBe(200);
      done();
    });
});
