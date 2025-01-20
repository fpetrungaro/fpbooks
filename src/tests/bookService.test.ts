import { BookService } from "../services/bookService";
import { books } from "../models/book";
import { eq } from "drizzle-orm";

// Mocking db module
jest.mock("../config/db", () => ({
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
import { db } from "../config/db";

describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    jest.clearAllMocks();
    bookService = new BookService();
  });

  test("should create a book", async () => {
    const bookData = { title: "fp book 1", author: "Fabio Doe" };

    // Simulate successful insertion
    (db.execute as jest.Mock).mockResolvedValue([{ id: 1 }]);

    const result = await bookService.createBook(bookData);

    expect(db.insert).toHaveBeenCalledWith(books);
    expect(db.execute).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1 }]);
  });

});



