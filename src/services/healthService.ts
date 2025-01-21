import mysql from "mysql2";
import logger from "../utils/logger";

export class HealthService {
    async isHealthy(): Promise<boolean> {
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

            logger.info("Health Check successful");
            return true;
        } catch (error) {
            logger.error("Error checking database health:", error);
            return false;
        } finally {
            // Close the database connection in the finally block
            if (connection) {
                connection.end();
            }
        }
    }
}
