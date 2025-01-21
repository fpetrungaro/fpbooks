import request from "supertest";
import app from "../../app";

describe("Book Validation Middleware with JWT", () => {
    let token: string;
    const userName = `testfabio_${Date.now()}`;

    // Generate a valid JWT token once before running tests
    beforeAll(async () => {
        await request(app)
            .post("/api/auth/register")
            .send({ username: userName, password: "password123" });

        const res = await request(app)
            .post("/api/auth/login")
            .send({ username: userName, password: "password123" });

        token = res.body.token;
    });

    test("Valid book should pass", async () => {
        let title = `The Fabio_${Date.now()}`;
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: title,
                author: "J.R.R. Fabio",
                publishedDate: "1937-09-21",
                genre: "Fantasy",
            });

        expect(res.status).toBe(201);
    });

    test("Title is required", async () => {
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                author: "F.P.P. Fabien",
                publishedDate: "1937-09-21",
                genre: "Fantasy",
            });

        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Title is required");
    });

    test("Title cannot exceed 50 characters", async () => {
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "A".repeat(51),
                author: "Fabio.R.R. Tolkien",
                publishedDate: "1937-09-21",
                genre: "Fantasy",
            });

        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Title must be at most 50 characters");
    });

    test("Published date must be a valid date", async () => {
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                publishedDate: "12/12/2024",
                genre: "Fantasy",
            });

        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Published date must be in YYYY-MM-DD format");
    });

    test("Genre is required", async () => {
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "The Petrungaro",
                author: "J.R.R. Tolkien",
                publishedDate: "1937-09-21",
            });

        expect(res.status).toBe(400);
        expect(res.body.errors[0].msg).toBe("Genre is required");
    });
});

