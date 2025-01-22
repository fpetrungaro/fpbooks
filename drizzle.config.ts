import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load the correct environment file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

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
