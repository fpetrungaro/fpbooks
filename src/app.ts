import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import { setupSwagger } from "./config/swagger";
import healthRoutes from "./routes/healthRoutes";
import authRoutes from "./routes/authRoutes";

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

setupSwagger(app);


export default app;
