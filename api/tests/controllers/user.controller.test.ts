import { Application } from "express";
import { createExpressApp } from "../../src/util/express-app";
import { getRouter } from "../../src/controllers";
import { UserController } from "../../src/controllers/user.controller";
import userService from "../../src/services/user.service";
import request from "supertest";
import User from "../../src/entities/user";

let app: Application;

beforeAll(async () => {
  app = createExpressApp();
  app.use(getRouter(UserController))
})

function removePassword(user: User) {
  const obj: Omit<User, "password"> = { ...user }
  delete obj['password'];
  return obj;
}

function matchUser(payload: Partial<User>) {
  return (user: User) => {
    for(const key of Object.keys(payload)) {
      if (!user[key]) { continue }
      if (user[key] !== payload[key]) { return false }
    }
    return true;
  }
}

describe("Users Controller", () => {
  const users: User[] = [
    { name: 'John', email: 'john@petworld.com', password: '12345678' },
    { name: 'Myke', email: 'myke@petworld.com', password: '12345678' },
    { name: 'Travis', email: 'travis@petworld.com', password: '12345678' }
  ];

  userService.find = async (payload) => {
    return users.filter(matchUser(payload));
  }

  it("should return 200 with all users", async () => {
    await request(app).get("/users")
      .expect(200)
      .expect(users.map(removePassword))
  });

  it("should return 200 with all users name John", async () => {
    const expected: any[] = users
      .filter(u => u.name == "John")
      .map(removePassword);

    await request(app).get("/users?name=John")
      .expect(200)
      .expect(expected)
  })
});