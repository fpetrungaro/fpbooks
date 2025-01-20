import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the correct environment file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

console.log(`Using environment file: ${envFile}`);
console.log("DB host: ", process.env.DB_HOST);
console.log("DB user: ", process.env.DB_USER);
console.log("DB password: ", process.env.DB_PASSWORD);
console.log("DB database: ", process.env.DB_NAME);
console.log("DB port: ", process.env.DB_PORT);

export default defineConfig({
  dialect: "mysql",
  schema: "./src/models",
  out: "./drizzle-migrations",

  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306, // Set a default port
  },
});



