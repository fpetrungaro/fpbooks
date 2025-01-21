import {BookService} from "../../services/bookService";
import {books} from "../../models/book";

// Mocking db module
jest.mock("../../config/db", () => ({
    db: {
        select: jest.fn(() => ({
            from: jest.fn(() => ({
                where: jest.fn(() => ({
                    execute: jest.fn().mockResolvedValue([]), // Default empty result
                })),
                execute: jest.fn().mockResolvedValue([]),
            })),
            execute: jest.fn().mockResolvedValue([]),
        })),

        execute: jest.fn().mockResolvedValue([]), // Simulate returning empty result
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
    },
}));



// Import db mock AFTER jest.mock()
import {db} from "../../config/db";

describe("BookService", () => {
    let bookService: BookService;

    beforeEach(() => {
        jest.clearAllMocks();
        bookService = new BookService();
    });

    it("should create a book", async () => {
        const bookData = {title: "fp book 1", author: "Fabio Doe"};

        // Simulate successful insertion
        (db.execute as jest.Mock).mockResolvedValue([{id: 1}]);
        const result = await bookService.createBook(bookData);

        expect(db.insert).toHaveBeenCalledWith(books);
        expect(db.execute).toHaveBeenCalled();
        expect(result).toEqual([{id: 1}]);
    });

    it("should fetch books with pagination", async () => {
        (db.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            offset: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue([
                {title: "Book 3", genre: "Fantasy"},
                {title: "Book 4", genre: "Sci-Fi"},
            ]),
        });

        const booksData = await bookService.getBooks({
            page: 1,
            limit: 10,
            sortBy: "title",
            order: "asc",
            filters: {},
        });

        expect(booksData).toHaveLength(2);
        expect(db.select).toHaveBeenCalled();
    });

    it("should filter books by genre", async () => {
        (db.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            offset: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue([
                {title: "Book 3", genre: "Fantasy"},
            ]),
        });

        const booksData = await bookService.getBooks({
            page: 1,
            limit: 5,
            sortBy: "title",
            order: "asc",
            filters: { genre: "Fantasy" },
        });

        expect(booksData).toHaveLength(1);
        expect(db.select).toHaveBeenCalled();
    });

    it("should filter books by published date range", async () => {
        (db.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnValue({
                orderBy: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                offset: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue([
                    { title: "The Fabio", publishedDate: "1910-09-21" },
                ]),
            }),
        });

        const booksData = await bookService.getBooks({
            filters: {
                publishedFrom: new Date("1930-01-01"),
                publishedTo: new Date("1940-12-31")
            },
        });

        expect(booksData).toHaveLength(1);
        expect(db.select).toHaveBeenCalled();
    });
});
