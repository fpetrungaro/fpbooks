import express from "express";
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../controllers/bookController";
import {authenticateJWT} from "../middlewares/authMiddleware";
import {validateBook} from "../middlewares/bookValidator";
import {errorHandler} from "../middlewares/errorHandler";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateJWT, getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *       400:
 *         description: Bad Request. The provided ID is invalid.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.s
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateJWT, getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date-time
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad Request. Validation failed. The request body may be missing required fields or contain invalid data.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticateJWT, validateBook, createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update an existing book
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date-time
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad Request. The provided ID is invalid or the request body contains invalid data.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticateJWT, updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad Request. The provided ID is invalid.
 *       401:
 *         description: Unauthorized. The user is not authenticated.
 *       403:
 *         description: Forbidden. The user is forbidden due to invalid token.
 *       404:
 *         description: Not Found. The book with the specified ID does not exist.
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticateJWT, deleteBook);

router.use(errorHandler)

export default router;
