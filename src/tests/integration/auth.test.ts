import request from "supertest";
import app from "../../app";
let token: string;

describe("Authentication Integration Tests", () => {

  let uniqueUsername: string;
  beforeAll(async () => {
      uniqueUsername = `testfabio_${Date.now()}`; //username unique per test run
  })

  console.log("username", uniqueUsername)
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: uniqueUsername, password: "password123" });
    console.log("response body ", res.body);
    console.log("response status code", res.body);

    expect([201, 200]).toContain(res.statusCode);
  });

  it("should log in and receive a JWT token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: uniqueUsername, password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });


  it("should access a protected route with JWT", async () => {
    const res = await request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("should fail to access a protected route without JWT", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(401);
  });

});

describe("Authentication Integration Tests - Validations", () => {
  it("should return a validation error for missing username", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ password: "password123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Validation error");
    expect(res.body.errors).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: "username", msg: "Username is required" }),
      expect.objectContaining({ path: "username", msg: "Username must be at least 3 characters" }),
    ]));
  });

  it("should return a validation error for a short password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "fabio", password: "123" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Validation error");
    expect(res.body.errors).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: "password", msg: "Password must be at least 6 characters" }),
    ]));
  });

});

