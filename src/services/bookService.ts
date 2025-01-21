import {db} from "../config/db";
import {books} from "../models/book";
import {and, like, gte, lte, desc, asc, eq} from "drizzle-orm";
import logger from "../utils/logger";

const MAX_LIMIT = 1000;

export class BookService {
    async getBooks(
        {
            page = 1,
            limit = 10,
            sortBy = "title",
            order = "asc",
            filters = {},
        }: {
            page?: number;
            limit?: number;
            sortBy?: string;
            order?: string;
            filters?: {
                title?: string;
                genre?: string;
                author?: string;
                publishedFrom?: Date;
                publishedTo?: Date;
            };
        }): Promise<any> {
        // hard limit
        const actualLimit = Math.min(limit, MAX_LIMIT);
        const offset = (page - 1) * actualLimit;
        let conditions = [];

        if (filters.title) {
            conditions.push(like(books.title, `%${filters.title}%`));
        }

        if (filters.genre) {
            conditions.push(like(books.genre, `%${filters.genre}%`));
        }

        if (filters.author) {
            conditions.push(like(books.author, `%${filters.author}%`));
        }

        if (filters.publishedFrom && filters.publishedTo) {
            conditions.push(
                and(
                    gte(books.publishedDate, filters.publishedFrom),
                    lte(books.publishedDate, filters.publishedTo)
                )
            );
        } else if (filters.publishedFrom) {
            conditions.push(
                gte(books.publishedDate, filters.publishedFrom),
            );
        } else if (filters.publishedTo) {
            conditions.push(
                lte(books.publishedDate, filters.publishedTo),
            );
        }

        const query = db
            .select()
            .from(books)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(order === "desc" ? desc(books[sortBy]) : asc(books[sortBy]))
            .limit(actualLimit)
            .offset(offset);

        return query.execute();
    }


    async getBookById(id: number) {
        logger.debug("service.getBookById: ", id);
        return db.select().from(books).where(eq(books.id, id)).execute();
    }

    async createBook(bookData: any) {
        logger.debug("service.createBook: ", bookData);
        return db.insert(books).values(bookData).execute();
    }

    async updateBook(id: number, bookData: any) {
        logger.debug("service.updateBook: ", id, bookData);
        return db.update(books).set(bookData).where(eq(books.id, id)).execute();
    }

    async deleteBook(id: number) {
        logger.debug("service.deleteBook: ", id);
        return db.delete(books).where(eq(books.id, id)).execute();
    }
}
