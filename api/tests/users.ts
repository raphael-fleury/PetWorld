import app from "../index";
import request from "supertest";

describe("/", () => {
  it("Get all users", async () => {
    const result = await request(app).get("/users");
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.statusCode).toEqual(200);
  });
});