import { Request, Response, NextFunction } from "express";

interface AppError {
  status?: number;
  message: string;
  errors?: any;
}

// Centralized error handler
export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};
