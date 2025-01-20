import {db} from "../config/db";
import {books} from "../models/book";
import {eq} from "drizzle-orm";
import mysql from "mysql2";

export class HealthService {
    isHealthy(): boolean {
        let connection;
        try {
            // Create a database connection
            const connection = mysql.createConnection({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });

            // Perform a simple query to check the database's health
            connection.execute("SELECT 1")
            connection.end();

            console.log("Health Check over");
            return true;
        } catch (error) {
            console.error("Error checking database health:", error);
            return false;
        } finally {
            // Close the database connection in the finally block
            if (connection) {
                connection.end();
            }
        }
    }

    async getBookById(id: number) {
        console.log("Get book by id", id);
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
