import { validateBook } from "../../middlewares/bookValidator";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

describe("Book Validation Middleware", () => {
  const mockRequest = (body: any) => ({ body } as Request);
  const mockResponse = {} as Response;
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Valid book should pass", async () => {
    const req = mockRequest({
      title: "fptitle1",
      author: "fpauthor1",
      publishedDate: "1937-09-21T00:00:00Z",
      genre: "Fantasy",
    });

    await Promise.all(validateBook.map((middleware) => middleware(req, mockResponse, mockNext)));

    expect(mockNext).toHaveBeenCalledWith();
  });

  test("Title is required", async () => {
    const req = mockRequest({
      author: "J.R.R. Tolkien",
      publishedDate: "1937-09-21T00:00:00Z",
      genre: "Fantasy",
    });

    await Promise.all(validateBook.map((middleware) => middleware(req, mockResponse, mockNext)));

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "title", msg: "Title is required" }),
      ])
    );
  });

  test("Title cannot exceed 50 characters", async () => {
    const req = mockRequest({
      title: "A".repeat(51),
      author: "J.R.R. Tolkien",
      publishedDate: "1937-09-21T00:00:00Z",
      genre: "Fantasy",
    });

    await Promise.all(validateBook.map((middleware) => middleware(req, mockResponse, mockNext)));

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "title", msg: "Title must be at most 50 characters" }),
      ])
    );
  });

  test("Published date must be a valid date", async () => {
    const req = mockRequest({
      title: "The Hobbit",
      author: "J.R.R. Fabio",
      publishedDate: "invalid-date",
      genre: "Fantasy",
    });

    await Promise.all(validateBook.map((middleware) => middleware(req, mockResponse, mockNext)));

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "publishedDate", msg: "Published date must be in YYYY-MM-DD format" }),
      ])
    );
  });

  test("Genre is required", async () => {
    const req = mockRequest({
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      publishedDate: "1937-09-21T00:00:00Z",
    });

    await Promise.all(validateBook.map((middleware) => middleware(req, mockResponse, mockNext)));

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "genre", msg: "Genre is required" }),
      ])
    );
  });
});


