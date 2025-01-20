import { Request, Response } from "express";
import { BookService } from "../services/bookService";

const bookService = new BookService();

export const getAllBooks = async (req: Request, res: Response) => {
  console.log("controller.getAllBooks");
  const books = await bookService.getAllBooks();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  console.log("getBookById");
  const book = await bookService.getBookById(parseInt(req.params.id));
  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return
  }
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  console.log("create book req body", req.body);
  const newBook = await bookService.createBook(req.body);
  res.status(201).json(newBook);
};

export const updateBook = async (req: Request, res: Response) => {
  await bookService.updateBook(parseInt(req.params.id), req.body);
  res.json({ message: "Book updated" });
};

export const deleteBook = async (req: Request, res: Response) => {
  await bookService.deleteBook(parseInt(req.params.id));
  res.json({ message: "Book deleted" });
};
