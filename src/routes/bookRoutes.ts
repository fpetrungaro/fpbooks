import express from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", authenticateJWT, getAllBooks);
router.get("/:id", authenticateJWT, getBookById);
router.post("/", authenticateJWT, createBook);
router.put("/:id", authenticateJWT, updateBook);
router.delete("/:id", authenticateJWT, deleteBook);

export default router;
