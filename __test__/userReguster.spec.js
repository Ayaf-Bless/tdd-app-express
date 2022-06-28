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

const validUser = {
  username: "user0",
  email: "test@gmail.com",
  password: "1121",
};
const invalidUser = {
  email: "test@gmail.com",
  password: "1121",
};
const postUser = (userObject) => {
  return request(app).post("/api/1.0/users").send(userObject);
};
describe("user registration", () => {
  it("returns 200 when signup is valid", async () => {
    const res = await postUser(validUser);
    expect(res.status).toBe(200);
  });

  it("returns success message when the data is valid", async () => {
    const res = await postUser(validUser);
    expect(res.body.message).toBe("User created");
  });

  it("saves the user to the database", async () => {
    await postUser(validUser);
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it("saves email and username to the database", async () => {
    await postUser(validUser);
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe("user0");
    expect(savedUser.email).toBe("test@gmail.com");
  });

  it("it hashes the password", async () => {
    await postUser(validUser);
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe("1122");
  });

  it("returns 400 when username is null", async () => {
    const response = await postUser(invalidUser);
    expect(response.status).toBe(400);
  });

  it("returns validationError when validation fails", async () => {
    const res = await postUser(invalidUser);
    const body = res.body;
    expect(body.validationErrors).not.toBeUndefined();
  });
  it("returns username cannot be null ", async () => {
    const res = await postUser(invalidUser);
    const body = res.body;
    expect(body.validationErrors.username).toEqual("username cannot be null");
  });
});
