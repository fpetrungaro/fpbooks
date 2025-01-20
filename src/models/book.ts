import { serial, varchar, timestamp, mysqlTable } from "drizzle-orm/mysql-core";

export const books = mysqlTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull().unique(),
  author: varchar("author", { length: 50 }).notNull(),
  publishedDate: timestamp("published_date"),
  genre: varchar("genre", { length: 20 }).notNull(),
});
