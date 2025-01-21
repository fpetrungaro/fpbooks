import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const logLevel = process.env.LOG_LEVEL || "info";

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({ filename: "logs/app.log" }),
    ],
});

logger.exceptions.handle(
    new winston.transports.File({ filename: "logs/exceptions.log" })
);

process.on("unhandledRejection", (reason) => {
    logger.error(`Unhandled Rejection: ${reason}`);
});


export default logger;
