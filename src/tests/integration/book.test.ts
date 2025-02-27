import request from "supertest";
import app from "../../app";
import {db} from "../../config/db";
import {books} from "../../models/book";


// generic function to generate a token
async function generateToken(userName: string) {
    await request(app)
        .post("/api/auth/register")
        .send({username: userName, password: "password123"});

    const res = await request(app)
        .post("/api/auth/login")
        .send({username: userName, password: "password123"});

    return res.body.token;
}

describe("DELETE /api/books - Integration Tests", () => {
    let token: string;
    let bookId: number;
    const userName = `testfabio_delete_${Date.now()}`;

    beforeAll(async () => {
        token = await generateToken(userName);
        const result = await db.insert(books).values({
            title: "Book to Delete",
            author: "Test Author",
            genre: "Test Genre",
            publishedDate: new Date("2022-07-07")
        }).$returningId()
        bookId = result[0].id;
    });

    afterAll(async () => {
        await db.delete(books).execute();
        
    });

    test("should delete a book successfully", async () => {
        const res = await request(app)
            .delete(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Book deleted");
    });

    test("should return 404 if trying to delete a non-existent book", async () => {
        const res = await request(app)
            .delete(`/api/books/9999999`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(404);
    });
});


describe("POST /api/books - Integration Tests", () => {
    let token: string;
    const userName = `testfabio_post_${Date.now()}`;

    // Generate a valid JWT token once before running tests
    beforeAll(async () => {
        token = await generateToken(userName);
    });

    afterAll(async () => {
        await db.delete(books).execute();
    });

    test("A book should be created", async () => {
        let title = `The Fabio_${Date.now()}`;
        const res = await request(app)
            .post("/api/books")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: title,
                author: "J.R.R. Fabio",
                publishedDate: "2000-09-21",
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


describe("GET /api/books - Integration Tests", () => {
    let token: string;
    const userName = `testfabio_get_${Date.now()}`;

    // Generate a valid JWT token once before running tests
    beforeAll(async () => {
        token = await generateToken(userName);
        await db.insert(books).values([
            {
                title: "The Hobbit",
                genre: "Fantasy",
                author: "J.R.R. Tolkien",
                publishedDate: new Date("1937-09-21")
            },
            {
                title: "Dune",
                genre: "Sci-Fi",
                author: "Frank Herbert",
                publishedDate: new Date("1965-06-01")
            },
            {
                title: "1984",
                genre: "Dystopian",
                author: "George Orwell",
                publishedDate: new Date("1949-06-08")
            },
        ]);
    });

    afterAll(async () => {
        await db.delete(books).execute();
    });

    it("should return a paginated list of books", async () => {
        const res = await request(app)
            .get("/api/books?page=1&limit=2")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("should filter books by genre", async () => {
        const res = await request(app)
            .get("/api/books?genre=Fantasy")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.body[0].genre).toContain("Fantasy");
    });

    it("should filter books by author", async () => {
        const res = await request(app)
            .get("/api/books?author=Tolkien")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body[0].author).toContain("Tolkien");
    });

    it("should filter books by published date range", async () => {
        const res = await request(app)
            .get("/api/books?publishedFrom=1930-01-01&publishedTo=1950-12-31")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("should sort books by title", async () => {
        const res = await request(app)
            .get("/api/books?sortBy=title&order=asc")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body[0].title).toBe("1984");
    });

    /* this test is not reliable and causes socket hang up intermittently
    it("should return 429 when rate limit is exceeded", async () => {
        for (let i = 0; i < 501; i++) {
            await request(app)
                .get("/api/books")
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
        const res = await request(app).get("/api/books");
        expect(res.status).toBe(429);
    });
    */

});


describe("PUT /api/books - Integration Tests", () => {
    let token: string;
    let bookId: number;
    const userName = `testfabio_put_${Date.now()}`;

    beforeAll(async () => {
        token = await generateToken(userName);
        const result = await db.insert(books).values({
            title: "Original Title",
            author: "Test Author",
            genre: "Test Genre",
            publishedDate: new Date("2020-01-01")
        }).$returningId()
        bookId = result[0].id;
    });

    afterAll(async () => {
        await db.delete(books).execute();
        
    });

    test("should update a book successfully", async () => {
        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Updated Title",
                author: "Updated Author",
                genre: "Updated Genre",
                publishedDate: "2021-05-10"
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Book updated");
    });

    test("should return 400 if updating title to an existing title", async () => {
        // Insert another book with the same title we want to update to
        await db.insert(books).values({
            title: "Duplicate Title",
            author: "Another Author",
            genre: "Another Genre",
            publishedDate: new Date("2019-06-15")
        });

        const res = await request(app)
            .put(`/api/books/${bookId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Duplicate Title"
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("A book with this title already exists");
    });
});


