const request = require("supertest");
const app = require("../src/app");

describe("user registration", () => {
  it("returns 200 when signup is valid", (done) => {
    request(app)
      .post("/api/1.0/users")
      .send({
        username: "user1",
        email: "test@gmail.com",
        password: "1122",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it("returns success message when the data is valid", (done) => {
    request(app)
      .post("/api/1.0/users")
      .send({
        username: "user1",
        email: "test@gmail.com",
        password: "1122",
      })
      .then((res) => {
        expect(res.body.message).toBe("User created");
        done();
      });
  });
});
