import dotenv from "dotenv";
console.log("Loading environment variables..")
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

console.log(`A Using environment file: ${envFile}`);
console.log("A DB host: ", process.env.DB_HOST);
console.log("A DB user: ", process.env.DB_USER);
console.log("A DB password: ", process.env.DB_PASSWORD);
console.log("A DB database: ", process.env.DB_NAME);
console.log("A DB port: ", process.env.DB_PORT);

import { drizzle } from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

console.log("MySQL2 Import", mysql)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export const db = drizzle(pool);
