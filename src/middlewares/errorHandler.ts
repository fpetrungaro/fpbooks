import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

interface AppError {
  status?: number;
  message: string;
  errors?: any;
}

// Centralized error handler
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  logger.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};
