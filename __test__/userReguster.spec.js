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
  const postValidUserPayload = async () => {
    return request(app).post("/api/1.0/users").send({
      username: "user1",
      email: "test@gmail.com",
      password: "1122",
    });
  };
  it("returns 200 when signup is valid", async () => {
    const res = await postValidUserPayload();
    expect(res.status).toBe(200);
  });

  it("returns success message when the data is valid", async () => {
    const res = await postValidUserPayload();
    expect(res.body.message).toBe("User created");
  });

  it("saves the user to the database", async () => {
    await postValidUserPayload();
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it("saves email and username to the database", async () => {
    await postValidUserPayload();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe("user1");
    expect(savedUser.email).toBe("test@gmail.com");
  });

  it("it hashes the password", async () => {
    await postValidUserPayload();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe("1122");
  });
});
