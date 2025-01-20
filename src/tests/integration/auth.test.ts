import request from "supertest";
import app from "../../app";
let token: string;

describe("Authentication Tests", () => {

  const uniqueUsername = `testfabio_${Date.now()}`; //username unique per test run
  console.log("username", uniqueUsername)
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: uniqueUsername, password: "password123" });
    console.log("response", res.body);

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

