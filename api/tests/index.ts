import app from "../index";
import request from "supertest";

describe("/", () => {
  it("Hello World", async () => {
    const result = await request(app).get("/");
    expect(result.text).toEqual("Hello world.");
    expect(result.statusCode).toEqual(200);
  });
});