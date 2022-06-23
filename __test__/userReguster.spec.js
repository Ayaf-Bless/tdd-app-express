const request = require("supertest");
const app = require("../src/app");
const User = require("../src/user/User");
const sequelize = require("../src/user/User");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

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

  it("saves the user to the database", (done) => {
    request(app)
      .post("/api/1.0/users")
      .send({
        username: "user1",
        email: "test@gmail.com",
        password: "1122",
      })
      .then(() => {
        // Query the user Table
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it("saves email and username to the database", (done) => {
    request(app)
      .post("/api/1.0/users")
      .send({
        username: "user1",
        email: "test@gmail.com",
        password: "1122",
      })
      .then(() => {
        // Query the user Table
        User.findAll().then((userList) => {
          const savedUser = userList[0];
          expect(savedUser.username).toBe("user1");
          expect(savedUser.email).toBe("test@gmail.com");
          done();
        });
      });
  });

  it("it hashes the password", (done) => {
    request(app)
      .post("/api/1.0/users")
      .send({
        username: "user1",
        email: "test@gmail.com",
        password: "1122",
      })
      .then(() => {
        // Query the user Table
        User.findAll().then((userList) => {
          const savedUser = userList[0];
          expect(savedUser.password).not.toBe("1122");
          done();
        });
      });
  });
});
