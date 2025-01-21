import {
  serial,
  varchar,
  mysqlTable,
  index,
  date
} from "drizzle-orm/mysql-core";

export const books = mysqlTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull().unique(),
  author: varchar("author", { length: 50 }).notNull(),
  publishedDate: date("published_date").notNull(),
  genre: varchar("genre", { length: 20 }).notNull(),
  //TODO: add createdAt and updatedAt fields for auditing
}, (table) => ({
  titleIdx: index("title_idx").on(table.title)
}));
