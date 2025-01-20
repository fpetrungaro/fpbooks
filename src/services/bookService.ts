import { db } from "../config/db";
import { books } from "../models/book";
import {eq} from "drizzle-orm";

export class BookService {
  async getAllBooks() {
    console.log("service.getAllBooks");
    console.log("Get all books");
    return db.select().from(books);
  }

  async getBookById(id: number) {
    console.log("service.getBookById", id);
    return db.select().from(books).where(eq(books.id, id)).execute();
  }

  async createBook(bookData: any) {
    return db.insert(books).values(bookData).execute();
  }

  async updateBook(id: number, bookData: any) {
    return db.update(books).set(bookData).where(eq(books.id, id)).execute();
  }

  async deleteBook(id: number) {
    return db.delete(books).where(eq(books.id, id)).execute();
  }
}
