import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import logger from "../utils/logger";

const bookService = new BookService();

export const getBooks = async (req: Request, res: Response) => {
    logger.debug("controller.getBooks");
    const {
        page,
        limit,
        sortBy,
        order,
        title,
        genre,
        author,
        publishedFrom,
        publishedTo
    } = req.query;

    const publishedFromDate = publishedFrom ? new Date(publishedFrom as string) : null;
    const publishedToDate = publishedTo ? new Date(publishedTo as string) : null;
    const books = await bookService.getBooks({

        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        sortBy: sortBy as string,
        order: order as string,
        filters: {
            title: title as string,
            genre: genre as string,
            author: author as string,
            publishedFrom: publishedFromDate,
            publishedTo: publishedToDate,
        },
    });

  res.status(200).json(books);

};

export const getBookById = async (req: Request, res: Response) => {
  logger.debug("getBookById");
  const book = await bookService.getBookById(parseInt(req.params.id));
  if (!book) {
    res.status(404).json({ message: "Book not found" });
    return
  }
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  logger.debug("create book req body", req.body);
  const newBook = await bookService.createBook(req.body);
  res.status(201).json(newBook);
  logger.info("Book created successfully!");
};

export const updateBook = async (req: Request, res: Response) => {
  await bookService.updateBook(parseInt(req.params.id), req.body);
  res.json({ message: "Book updated" });
};

export const deleteBook = async (req: Request, res: Response) => {
  await bookService.deleteBook(parseInt(req.params.id));
  res.json({ message: "Book deleted" });
};
