import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import { setupSwagger } from "./config/swagger";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes";
import {errorHandler} from "./middlewares/errorHandler";

// env variables setup
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// Health check route
app.use("/", healthRoutes);
// books routes
app.use("/api/books", bookRoutes);
// auth routes
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "development") {
      // Enable Swagger documentation only in development environment
    setupSwagger(app);
}

// Centralized error handler
app.use(errorHandler);

export default app;
